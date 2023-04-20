import { BaseModule } from 'base';
import { CollarModel, CollarSettingsModel } from 'Settings/Models/collar';
import { ModuleCategory } from 'Settings/setting_definitions';
import { settingsSave, parseMsgWords, SendAction, OnChat, getRandomInt, hookFunction, removeAllHooksByModule, OnActivity, OnAction, setOrIgnoreBlush } from '../utils';

export class CollarModule extends BaseModule {

    get settings(): CollarSettingsModel {
		return super.settings as CollarSettingsModel;
	}

    get Enabled(): boolean {
		return super.Enabled && this.wearingCorrectCollar;
	}

    get wearingCorrectCollar(): boolean {
        if (!this.settings.collar || !this.settings.collar.name)
            return true;

        var collar = InventoryGet(Player, "ItemNeck");
        var collarName = collar?.Craft?.Name ?? (collar?.Asset.Name ?? "");
        var collarCreator = collar?.Craft?.MemberNumber ?? 0;
        return collarName == this.settings.collar.name && collarCreator == this.settings.collar.creator;
    }

    load(): void {
        CommandCombine([
            {
                Tag: 'tight',
                Description: ": tighten collar",

                Action: () => {
                    if (!this.Enabled)
                        return;
                    this.IncreaseCollarChoke();
                }
            },
            {
                Tag: 'loose',
                Description: ": loosen collar",

                Action: () => {
                    if (!this.Enabled)
                        return;
                    this.DecreaseCollarChoke();
                }
            }
        ])

        OnChat(600, ModuleCategory.Collar, (data, sender, msg, metadata) => {
            if (!this.Enabled)
                return;
            var lowerMsgWords = parseMsgWords(msg);
            if (this.CanActivate(sender)) {
                if ((lowerMsgWords?.indexOf("tight") ?? -1) >= 0)
                    this.IncreaseCollarChoke();
                else if ((lowerMsgWords?.indexOf("loose") ?? -1) >= 0)
                    this.DecreaseCollarChoke();
            }
        });

        OnActivity(100, ModuleCategory.Collar, (data, sender, msg, meta) => {
            let target = data.Dictionary.find((d: any) => d.Tag == "TargetCharacter");
            if (!!data && 
                !!sender && 
                data.Content == "ChatOther-ItemNeck-Choke" && 
                Player.LSCG.MiscModule.handChokeEnabled &&
                !!target && 
                target.MemberNumber == Player.MemberNumber) {
                this.HandChoke(sender);
            }
        });

        OnAction(100, ModuleCategory.Collar, (data, sender, msg, meta) => {
            if (!data.Dictionary || !data.Dictionary[2] || !data.Dictionary[3])
                return;

            var target = data.Dictionary[2]?.MemberNumber;
            if (target != Player.MemberNumber)
                return;

            if ((msg == "ActionSwap" || "ActionRemove") && data.Dictionary[3]?.GroupName == "ItemNeck") {
                this.ReleaseCollar();
            }
        })

        // event on room join
        hookFunction("ChatRoomSync", 4, (args, next) => {
            next(args);
            if (!this.Enabled)
                return;
            else
                this.ResetChoke();
            this.ActivateChokeEvent();
        }, ModuleCategory.Collar);

        hookFunction('ServerSend', 4, (args, next) => {
            // if (!this.Enabled && !Player.LSCG.MiscModule.handChokeEnabled)
            //     return next(args);
            // Prevent speech at choke level 4
            if (args[0] == "ChatRoomChat" && args[1].Type == "Chat"){
                if (this.settings.chokeLevel >= 4) {
                    SendAction("%NAME%'s mouth moves silently.");
                    return null;
                }
                else if (this.settings.chokeLevel > 1) {
                    args[1].Content = SpeechGarbleByGagLevel((this.settings.chokeLevel-1)**2, args[1].Content);
                    return next(args);
                }
                else
                    return next(args);
            }
            else
                return next(args);
        }, ModuleCategory.Collar);

        hookFunction("Player.HasTints", 5, (args, next) => {
            if (this.settings.chokeLevel > 2 && Player.ImmersionSettings?.AllowTints) return true;
            return next(args);
        }, ModuleCategory.Collar);

        hookFunction("Player.GetTints", 5, (args, next) => {
            // if (!this.Enabled)
            //     return next(args);
            if (this.settings.chokeLevel == 3) return [{r: 0, g: 0, b: 0, a: 0.2}];
            else if (this.settings.chokeLevel == 4) return [{r: 0, g: 0, b: 0, a: 0.6}];
            return next(args);
        }, ModuleCategory.Collar);
            
        hookFunction("Player.GetBlurLevel", 5, (args, next) => {
            // if (!this.Enabled)
            //     return next(args);
            if (this.settings.chokeLevel == 3) return 2;
            if (this.settings.chokeLevel == 4) return 6;
            return next(args);
        }, ModuleCategory.Collar);

        this.eventInterval = setInterval(() => this.ChokeEvent(), this.chokeEventTimer);

        if (this.settings.chokeLevel == undefined) {
            this.settings.chokeLevel = 0;
            settingsSave();
        }

        if (this.settings.chokeLevel > 2) {
            this.setChokeTimeout(() => this.DecreaseCollarChoke(), this.chokeTimer);
        }
    }

    unload(): void {
        removeAllHooksByModule(ModuleCategory.Collar);
    }

    // Choke Collar Code
    get allowedChokeMembers(): number[] {
        let stringList = this.settings.allowedMembers.split(",");
        return stringList.filter(str => !!str && (+str === +str)).map(str => parseInt(str));
    }

    get totalChokeLevel(): number {
        return Math.min(this.settings.chokeLevel + this.handChokeModifier, 4);
    }

    chokeTimeout: number = 0;
    chokeTimer: number = 120000;
    chokeEventTimer: number = 60010;
    passout1Timer: number = 30000;
    passout2Timer: number = 15000;
    passout3Timer: number = 10000;
    eventInterval: number = 0;
    handChokeModifier: number = 0;

    setChokeTimeout(f: TimerHandler, delay: number | undefined) {
        clearTimeout(this.chokeTimeout);
        if (typeof f === "string")
            this.chokeTimeout = setTimeout(f, delay);
        else
            this.chokeTimeout = setTimeout(() => f(), delay);
    }

    handChokeTimeout: number = 0;
    HandChoke(chokingMember: Character) {
        console.debug("Hand-choke event.. coming soon.");
        
        if (this.handChokeModifier >= 4)
            return;
            
        this.handChokeModifier = Math.min(this.handChokeModifier + 1, 4);
        this.IncreaseArousal();
        clearTimeout(this.handChokeTimeout);
        this.handChokeTimeout = setTimeout(() => this.ReleaseHandChoke(chokingMember), 60000);

        CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
        switch (this.totalChokeLevel) {
            case 1:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME%'s eyes flutter as %OPP_NAME% wraps their hand around %POSSESSIVE% neck.", chokingMember);
                setOrIgnoreBlush("Low");
                CharacterSetFacialExpression(Player, "Eyes", "Sad");
                break;
            case 2:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME% gasps for air as %OPP_NAME% tightens their grip on %POSSESSIVE% neck.", chokingMember);
                setOrIgnoreBlush("Medium");
                CharacterSetFacialExpression(Player, "Eyes", "Surprised");
                break;
            case 3:
                this.setChokeTimeout(() => this.DecreaseCollarChoke(), this.chokeTimer);
                SendAction("%NAME%'s face runs flush, choking as %OPP_NAME% presses firmly against their neck, barely allowing any air to %POSSESSIVE% lungs.", chokingMember);
                setOrIgnoreBlush("High");
                CharacterSetFacialExpression(Player, "Eyes", "Scared");
                break;
            case 4:
                this.StartPassout(false, chokingMember);
                break;
            default:
                break;
        }
    }

    ReleaseHandChoke(chokingMember: Character | null) {
        if (this.handChokeModifier > 0) {
            SendAction("%NAME% gasps in relief as %OPP_NAME% releases their pressure on %POSSESSIVE% neck.", chokingMember);
            this.handChokeModifier = 0;
            // If collar still tight, wait just a second and ping an event as a "helpful" reminder
            if (this.settings.chokeLevel > 0)
                setTimeout(() => this.ChokeEvent(), 1000);
        }
    }

    CanActivate(sender: Character | null) {
        var currentCollarObj = InventoryGet(Player, "ItemNeck");
        if (!currentCollarObj)
            return false; // Cannot choke if no collar on
        var currentCollar = <CollarModel>{
            name: currentCollarObj.Craft?.Name ?? currentCollarObj.Asset.Name,
            creator: currentCollarObj.Craft?.MemberNumber ?? 0
        };
        return !!sender &&
                (this.allowedChokeMembers.length == 0 || this.allowedChokeMembers.indexOf(sender?.MemberNumber ?? 0) >= 0) &&
                currentCollar.name == this.settings.collar?.name &&
                currentCollar.creator == this.settings.collar?.creator
    }

    IncreaseCollarChoke() {
        if (isNaN(this.settings.chokeLevel))
            this.settings.chokeLevel = 0;
        if (this.settings.chokeLevel == 4)
            return;
        this.settings.chokeLevel = Math.min(this.settings.chokeLevel + 1, 4);
        AudioPlaySoundEffect("HydraulicLock");
        this.IncreaseArousal();

        CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
        switch (this.totalChokeLevel) {
            case 1:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME%'s eyes flutter as %POSSESSIVE% collar starts to tighten around %POSSESSIVE% neck with a quiet hiss.");
                setOrIgnoreBlush("Low");
                CharacterSetFacialExpression(Player, "Eyes", "Sad");
                break;
            case 2:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME% gasps for air as %POSSESSIVE% collar presses in around %POSSESSIVE% neck with a hiss.");
                setOrIgnoreBlush("Medium");
                CharacterSetFacialExpression(Player, "Eyes", "Surprised");
                break;
            case 3:
                this.setChokeTimeout(() => this.DecreaseCollarChoke(), this.chokeTimer);
                SendAction("%NAME%'s face runs flush, choking as %POSSESSIVE% collar hisses, barely allowing any air to %POSSESSIVE% lungs.");
                setOrIgnoreBlush("High");
                CharacterSetFacialExpression(Player, "Eyes", "Scared");
                break;
            case 4:
                this.StartPassout();
                break;
            default:
                break;
        }

        settingsSave();
    }

    DecreaseCollarChoke() {
        if (this.settings.chokeLevel <= 0) {
            this.settings.chokeLevel = 0;
            return;
        }

        AudioPlaySoundEffect("Deflation");
        this.settings.chokeLevel--;
        if (this.settings.chokeLevel > 0)
        this.setChokeTimeout(() => this.DecreaseCollarChoke(), this.chokeTimer);

        switch (this.totalChokeLevel) {
            case 3:
                this.setChokeTimeout(() => this.DecreaseCollarChoke(), this.chokeTimer);
                SendAction("%NAME% chokes and gasps desperately as %POSSESSIVE% collar slowly releases some pressure.");
                setOrIgnoreBlush("High");
                CharacterSetFacialExpression(Player, "Eyes", "Lewd");
                break;
            case 2:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME%'s collar opens a little as %PRONOUN% lets out a moan, gulping for air.");
                setOrIgnoreBlush("Medium");
                CharacterSetFacialExpression(Player, "Eyes", "Sad");
                break;
            case 1:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME% whimpers thankfully as %POSSESSIVE% collar reduces most of its pressure around %POSSESSIVE% neck.");
                setOrIgnoreBlush("Low");
                CharacterSetFacialExpression(Player, "Eyes", "None");
                break;
            case 0:
                clearTimeout(this.chokeTimeout);
                SendAction("%NAME% takes a deep breath as %POSSESSIVE% collar releases its grip with a hiss.");
                setOrIgnoreBlush("Default");
                break;
            default:
                break;
        }

        settingsSave();
    }

    ReleaseCollar() {
        if (this.settings.chokeLevel > 0)
            SendAction("%NAME% gulps thankfully as the threat to %POSSESSIVE% airway is removed.")
        this.ResetChoke();
    }

    ResetChoke() {
        this.settings.chokeLevel = 0;
        clearTimeout(this.chokeTimeout);
        settingsSave();
    }

    StartPassout(isCollar: boolean = true, chokingMember: Character | null = null) {
        if (isCollar)
            SendAction("%NAME%'s eyes start to roll back, gasping and choking as %POSSESSIVE% collar presses in tightly and completely with a menacing hiss.");
        else
            SendAction("%NAME%'s eyes start to roll back with a groan as %OPP_NAME% completely closes %POSSESSIVE% airway with their hand.", chokingMember);
        setOrIgnoreBlush("VeryHigh");
        CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
        CharacterSetFacialExpression(Player, "Eyes", "Lewd");
        this.setChokeTimeout(() => this.Passout1(isCollar, chokingMember), this.passout1Timer);
    }

    Passout1(isCollar: boolean = true, chokingMember: Character | null = null) {
        this.IncreaseArousal();
        if (isCollar)
            SendAction("%NAME% chokes and spasms, %POSSESSIVE% collar holding tight.");
        else
            SendAction("%NAME% chokes and spasms, %OPP_NAME% gripping %POSSESSIVE% throat relentlessly.", chokingMember);
        setOrIgnoreBlush("Extreme");
        CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
        CharacterSetFacialExpression(Player, "Eyes", "Lewd");
        CharacterSetFacialExpression(Player, "Mouth", "HalfOpen");
        this.setChokeTimeout(() => this.Passout2(isCollar, chokingMember), this.passout2Timer);
    }

    Passout2(isCollar: boolean = true, chokingMember: Character | null = null) {
        this.IncreaseArousal();
        if (isCollar) {
            SendAction("%NAME% convulses weakly with a moan, %POSSESSIVE% eyes rolling back as the collar hisses impossibly tighter.");
            AudioPlaySoundEffect("HydraulicLock");
        }
        else
            SendAction("%NAME% convulses weakly with a moan, %POSSESSIVE% eyes rolling back as %OPP_NAME% clenches around their throat even tighter.", chokingMember);
        setOrIgnoreBlush("ShortBreath");
        CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
        CharacterSetFacialExpression(Player, "Eyes", "VeryLewd");
        CharacterSetFacialExpression(Player, "Mouth", "HalfOpen");
        this.setChokeTimeout(() => this.Passout3(isCollar, chokingMember), this.passout3Timer);
    }

    Passout3(isCollar: boolean = true, chokingMember: Character | null = null) {
        this.IncreaseArousal();
        if (isCollar) {
            SendAction("As %NAME% collapses unconscious, %POSSESSIVE% collar releases all of its pressure with a long hiss.");
            AudioPlaySoundEffect("Deflation");
            this.ResetChoke();
        }
        else {
            SendAction("As %NAME% collapses unconscious, %OPP_NAME% releases %POSSESSIVE% neck.", chokingMember);
            this.ReleaseHandChoke(chokingMember);
        }
        setOrIgnoreBlush("Medium");
        CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
        CharacterSetFacialExpression(Player, "Eyes", "Closed");
        CharacterSetFacialExpression(Player, "Mouth", "Closed");
        clearTimeout(this.chokeTimeout);
    }

    ChokeEvent() {
        if (!this.wearingCorrectCollar)
            return;
        // only activate 1/4 times triggered unless at high level
        if (this.settings.chokeLevel > 2)
            this.ActivateChokeEvent();
        else if (this.settings.chokeLevel == 2 && getRandomInt(8) == 0)
            this.ActivateChokeEvent();
        else if (this.settings.chokeLevel == 1 && getRandomInt(15) == 0)
            this.ActivateChokeEvent();
    }

    ActivateChokeEvent() {
        const ChokeEvents = {
            low: [
                "%NAME% coughs as %POSSESSIVE% collar pushes against %POSSESSIVE% throat.",
                "%NAME% gulps as %PRONOUN% feels the tight collar around %POSSESSIVE% neck.",
                "%NAME% shifts nervously in %POSSESSIVE% tight collar.",
                "%NAME% trembles, very conscious of the tight collar around %POSSESSIVE% neck.",
                "%NAME% huffs uncomfortably in %POSSESSIVE% tight collar."
            ],
            mid: [
                "%NAME% whimpers pleadingly as %PRONOUN% struggles to take a full breath.",
                "%NAME% chokes against %POSSESSIVE% collar, moaning softly.",
                "%NAME%'s eyes flutter weakly as %POSSESSIVE% collar presses into %POSSESSIVE% neck.",
                "%NAME% tries to focus on breathing, each inhale an effort in %POSSESSIVE% collar."
            ],
            high: [
                "%NAME% splutters and chokes, struggling to breath.",
                "%NAME% grunts and moans, straining to breath.",
                "%NAME%'s eyes have trouble focusing, as %PRONOUN% chokes and gets lightheaded."
            ]
        }
        switch (this.settings.chokeLevel) {
            case 1:
                SendAction(ChokeEvents.low[getRandomInt(ChokeEvents.low.length)]);
                break;
            case 2:
                SendAction(ChokeEvents.mid[getRandomInt(ChokeEvents.mid.length)]);
                break;
            case 3:
                SendAction(ChokeEvents.high[getRandomInt(ChokeEvents.high.length)]);
                break;
            default:
                break;
        }
    }

    IncreaseArousal() {
        ActivitySetArousal(Player, Math.min(99, (Player.ArousalSettings?.Progress ?? 0) + 10));
    }
}
