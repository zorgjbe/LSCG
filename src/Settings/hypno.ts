import { HypnoSettingsModel } from "./Models/hypno";
import { GuiSubscreen } from "./settingBase";

export class GuiHypno extends GuiSubscreen {
    readonly character : PlayerCharacter;

    constructor(character: PlayerCharacter) {
		super();
		this.character = character;
    }

	get settings(): HypnoSettingsModel {
		return Player.LSCG.HypnoModule ?? { enabled: false };
	}

    Run() {
		var prev = MainCanvas.textAlign;
		MainCanvas.textAlign = "left";

		DrawText("- LSCG Hypnosis -", 225, 125, "Black", "Gray");
		DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "BCX main menu");

		// Enabled 					[true/false]
		DrawCheckbox(225, 190 + 120 * 1, 64, 64, "Enabled", this.settings.enabled ?? true);
		
		// Override Trigger Words 	[Word List]
		DrawText("Override Trigger Words:", 225, 190 + 249, "Black", "Gray");
		ElementCreateInput("hypno_overrideWords", "text", this.settings.overrideWords ?? "", "255");
		ElementPosition("hypno_overrideWords", 500, 190 + 240, 200);

		// Override allowed members	[Member ID List]
		DrawText("Override Allowed Member IDs:", 225, 190 + 360, "Black", "Gray");
		ElementCreateInput("hypno_overrideMembers", "text", this.settings.overrideMemberIds ?? "", "255");
		ElementPosition("hypno_overrideMembers", 500, 190 + 360, 200);

		// Enabled 					[true/false]
		DrawCheckbox(225, 190 + 120 * 1, 64, 64, "Enable Cycle", this.settings.enableCycle ?? true);

		// Cycle Time				[Number of minutes (default 30)]
		DrawText("Trigger Cycle Time:", 225, 190 + 480, "Black", "Gray");
		ElementCreateInput("hypno_cycleTime", "text", this.settings.cycleTime ?? "30", "100");
		ElementPosition("hypno_cycleTime", 500, 190 + 480, 200);

		MainCanvas.textAlign = prev;
	}

	Unload(): void {
		ElementRemove("hypno_overrideWords");
		ElementRemove("hypno_overrideMembers");
		ElementRemove("hypno_cycleTime");
	}

	Click() {
		if (MouseIn(1815, 75, 90, 90)) return this.Exit();
	}
}