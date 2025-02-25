/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-shadow */

// Female3DCG.js
declare var PoseFemale3DCG: Pose[];
declare var ActivityFemale3DCG: Activity[];
declare let ActivityFemale3DCGOrdering: string[];

// Activity.js
declare var ActivityOrgasmRuined: boolean;
declare var ActivityOrgasmGameResistCount: number;
declare var ActivityDictionary: string[][];
declare function ActivitySetArousal(C: Character, Progress: number): void;
declare function ActivityOrgasmPrepare(C: Character, Bypass?: boolean): void;
declare function ActivityDictionaryText(KeyWord: string): string;

// AfkTimer.js
declare var AfkTimerEventsList: string[];

// Appearance.js
declare const CanvasUpperOverflow: number;
declare const CanvasLowerOverflow: number;
declare const CanvasDrawHeight: number;
declare var CharacterAppearanceSelection: Character | null;
declare var CharacterAppearanceMode: string;
declare var CharacterAppearanceWardrobeText: string;
declare var AppearanceMenu: any[];
declare var CharacterAppearanceWardrobeOffset: number;
/** NMod ONLY! */
declare var AppearanceMode: string;
declare function CharacterAppearanceYOffset(C: Character, HeightRatio: number, IgnoreUpButton?: boolean): number;
declare function AppearanceMenuBuild(C: Character): void;
declare function CharacterAppearanceStripLayer(C: Character): void;
declare function CharacterAppearanceSetItem(C: Character, Group: string, ItemAsset: Asset | null, NewColor?: string | string[], DifficultyFactor?: number, ItemMemberNumber?: number, Refresh?: boolean): void;
declare function CharacterAppearanceRestore(C: Character, backup: string): void;
declare function CharacterAppearanceStringify(C: Character): string;

// Audio.js
declare function AudioPlaySoundEffect(soundEffect: string, volumeModifier: number): void;
declare function AudioPlaySoundEffect(soundEffect: string): void;

// Backgrounds.js
declare var BackgroundsTagList: string[];
declare var BackgroundsList: { Name: string; Tag: string[]; }[];
declare function BackgroundsGenerateList(BackgroundTagList: string[]): string[];

// BackgroundSelection.js
declare var BackgroundSelectionTagList: any[];
declare var BackgroundSelectionAll: { Name: string; Description: string; Low: string; }[];
declare var BackgroundSelectionOffset: number;
declare var BackgroundSelectionView: any[];
declare var BackgroundSelectionPreviousScreen: string;
declare function BackgroundSelectionMake(List: string[], Idx: number, Callback: (name: string) => void, HideDropDown?: boolean): void;

// Timer.js
declare var CurrentTime: number;

// Commands.js
declare function CommandCombine(add: ICommand | ICommand[]): void;

// Common.js
declare const Player: PlayerCharacter;
declare const PreferenceSubscreenList: any;
declare var CurrentModule: any;
declare var CurrentScreen: string;
declare var KeyPress: number | string;
declare var CurrentScreenFunctions: ScreenFunctions;
declare var MouseX: number;
declare var MouseY: number;
declare var GameVersion: string;
declare const CommonGetFont: MemoizedFunction<(size: number) => string>;
declare const CommonGetFontName: MemoizedFunction<() => string>;
declare function CommonTime(): number;
declare function CommonColorsEqual(C1: string | string[], C2: string | string[]): boolean;
declare function CommonArraysEqual(a1: any[], a2: any[]): boolean;
declare function CommonSetScreen(NewModule: string, NewScreen: string): void;
declare function CommonConvertStringToArray(s: string): number[];
declare function CommonDynamicFunction(funcName: string): void;
declare function CommonIsNumeric(val: string | undefined): boolean;
declare function CommonStringSubstitute(msg: string, substitution: [string,string][]): string;

// FriendList.js
declare var FriendListBeepTarget: number | null;
declare var FriendListBeepLog: IFriendListBeepLogMessage[];

// Character.js
declare function CharacterDeleteAllOnline(): void;
declare function CharacterGetCurrent(): Character | null;
declare function CharacterRefresh(C: Character, Push?: boolean, RefreshDialog?: boolean): void;
declare function CharacterSetCurrent(C: Character): void;
declare function CharacterLoadCanvas(C: Character): void;
declare function CharacterAppearsInverted(C: Character): boolean;
declare function CharacterCanChangeToPose(C: Character, poseName: string): boolean;
declare function CharacterSetActivePose(C: Character, NewPose: string | null, ForceChange?: boolean): void;
declare function CharacterSetFacialExpression(C: Character, AssetGroup: string, Expression: string | null, Timer?: number, Color?: string | string[]): void;
declare function CharacterNickname(C: Character): string;

// Crafting.js
declare const CraftingStatusType: {
	OK: 2;
	ERROR: 1;
	CRITICAL_ERROR: 0;
};
declare function CraftingValidate(Craft: CraftingItem, Asset?: Asset | null, Warn?: boolean): CraftingStatusType;

// Element.js
declare function ElementIsScrolledToEnd(ID: string): boolean;
declare function ElementScrollToEnd(ID: string): void;
declare function ElementFocus(ID: string): void;
declare function ElementCreateInput(ID: string, Type: string, Value: string, MaxLength: string): HTMLInputElement;
declare function ElementPosition(ElementID: string, X: number, Y: number, W: number, H?: number): void;
declare function ElementPositionFix(ElementID: string, Font: any, X: number, Y: number, W: number, H: number): void;
declare function ElementRemove(ID: string): void;
declare function ElementToggleGeneratedElements(Screen: string, ShouldDisplay: boolean): void;
declare function ElementValue(ID: string, Value?: string): string | undefined;
declare function ElementContent(ID: string, Content: string): string | undefined;

// Dialog.js
declare var StruggleProgress: number;
declare var DialogColor: any;
declare var DialogTextDefault: string;
declare var DialogFacialExpressions: any[];
declare var DialogFacialExpressionsSelected: number;
declare var DialogFocusItem: Item;
declare var DialogSelfMenuOptions: any[];
declare var DialogMenuButton: string[];
declare var DialogActivityMode: boolean;
declare var DialogCraftingMenu: boolean;
declare var DialogItemToLock: any;
declare var DialogInventory: DialogInventoryItem[];
declare var DialogItemPermissionMode: boolean;
declare var CurrentCharacter: Character | null;
declare var DialogFacialExpressionsSelectedBlindnessLevel: number;
declare function DialogIntro(): string;
declare function DialogLeave(): void;
declare function DialogInventoryBuild(C: Character, Offset?: number, redrawPreviews?: boolean): void;
declare function DialogFindPlayer(KeyWord: string): string;
declare function DialogDrawPoseMenu(): void;
declare function DialogDrawExpressionMenu(): void;
declare function WardrobeGetExpression(C: Character): ExpressionSet;

// Drawing.js
/** @deprecated */
declare const DrawRunMap: Map<string, () => void>;
/** @deprecated */
declare var DrawScreen: string;
declare var DrawHoverElements: (() => void)[];
declare var MainCanvas: CanvasRenderingContext2D;
declare var CharacterCanvas: CanvasRenderingContext2D;
declare function DrawGetImage(Source: string): HTMLImageElement;
declare function DrawButton(Left: number, Top: number, Width: number, Height: number, Label: string, Color: string, Image?: string, HoveringText?: string, Disabled?: boolean): void;
declare function DrawCheckbox(Left: number, Top: number, Width: number, Height: number, Text: string, IsChecked: boolean, Disabled?: boolean, TextColor?: string, CheckImage?: string): void;
declare function DrawText(Text: string, X: number, Y: number, Color: string, BackColor?: string): void;
declare function DrawTextFit(Text: string, X: number, Y: number, Width: number, Color: string, BackColor?: string): void;
declare function DrawTextWrap(Text: string, X: number, Y: number, Width: number, Height: number, ForeColor: string, BackColor?: string, MaxLine?: number): void;
declare function DrawBackNextButton(Left: number, Top: number, Width: number, Height: number, Label: string, Color: string, Image?: string, BackText?: () => string, NextText?: () => string, Disabled?: boolean, ArrowWidth?: number): void;
declare function DrawButtonHover(Left: number, Top: number, Width: number, Height: number, HoveringText: string): void;
declare function DrawEmptyRect(Left: number, Top: number, Width: number, Height: number, Color: string, Thickness?: number): void;
declare function DrawRect(Left: number, Top: number, Width: number, Height: number, Color: string): void;
declare function DrawCharacter(C: Character, X: number, Y: number, Zoom: number, IsHeightResizeAllowed: boolean, DrawCanvas: CanvasRenderingContext2D): void;
declare function DrawImageResize(image: string, x: number, y: number, w: number, h: number): boolean;

// Cheat.js
declare function CheatImport(): void;

// Chatroom.js
declare var ChatRoomCharacter: Character[];
declare var ChatRoomTargetMemberNumber: number | null;
declare var ChatRoomHideIconState: number;
declare var ChatRoomData: null | ChatRoom;
declare var ChatRoomGame: string;
declare var ChatRoomLastMessage: string[];
declare var ChatRoomLastMessageIndex: number;
declare var ChatRoomLeashPlayer: number | null;
declare var ChatRoomCharacterCount: number;
declare var ChatRoomCharacterDrawlist: Character[];
declare var ChatRoomMenuButtons: string[];
declare var ChatRoomPlayerCanJoin: boolean;
declare var ChatRoomSenseDepBypass: boolean;
declare var DialogLentLockpicks: boolean;
declare var ChatRoomSlowtimer: number;
declare var ChatRoomMessageExtractors: ChatRoomMessageExtractor[];
declare function ChatRoomMessageDefaultMetadataExtractor(data: IChatRoomMessage, SenderCharacter: Character): {
	metadata: IChatRoomMessageMetadata;
	substitutions: [string, string][];
};
declare function ChatRoomCurrentTime(): string;
declare function ChatRoomCharacterUpdate(C: Character): void;
declare function ChatRoomMessage(data: IChatRoomMessage): void;
declare function ChatRoomSetLastChatRoom(room: string): void;
declare function ChatRoomShouldBlockGaggedOOCMessage(Message: string, WhisperTarget: Character | undefined): boolean;
declare function ChatRoomPlayerIsAdmin(): boolean;
declare function ChatRoomClearAllElements(): void;
declare function ChatRoomListUpdate(list: number[], adding: boolean, number: number): void;
declare function ChatRoomStart(Space: ChatRoomSpaceType, Game: string, LeaveRoom: string, LeaveSpace: string, Background: string, BackgroundTagList: any[]): void;
declare function ChatRoomSendLocal(msg: string): void;
declare function ChatRoomMessageRunExtractors(data: IChatRoomMessage, SenderCharacter: Character): {
	metadata: IChatRoomMessageMetadata;
	substitutions: [string, string][];
};

// ChatAdmin.js
declare var ChatAdminBackgroundIndex: number;
declare var ChatAdminBackgroundSelect: string;
declare var ChatAdminPrivate: boolean;
declare var ChatAdminLocked: boolean;
declare var ChatAdminGame: string;
declare var ChatAdminBlockCategory: any[];
declare var ChatAdminLanguage: string;

// ChatCreate.js
declare var ChatCreateBackgroundList: any;
declare var ChatCreateShowBackgroundMode: boolean;

// ChatBlockItem.js
declare var ChatBlockItemEditable: boolean;
declare var ChatBlockItemReturnData: { Screen?: string; };

// ChatSelect.js
declare function ChatSelectGendersAllowed(space: string, genders: string[]): boolean;

// Server.js
declare var ServerBeep: {
	Message: string;
	Timer: number;
	ChatRoomName?: string | null;
	IsMail?: boolean;
};
declare var ServerSocket: import("socket.io-client").Socket;
declare var ServerIsConnected: boolean;
declare var ServerAccountUpdate: {
	SyncToServer(): void;
	QueueData(Data: object, Force?: true): void
};
declare var ServerCharacterNicknameRegex: RegExp;
declare function ServerPlayerIsInChatRoom(): boolean;
declare function ServerSend(Message: string, Data: any): void;
declare function ServerAppearanceBundle(Appearance: Item[]): AppearanceBundle;
declare function ServerPlayerInventorySync(): void;
declare function ServerAccountBeep(data: any): void;
declare function ServerChatRoomGetAllowItem(Source: Character, Target: Character): boolean;
declare function ServerPlayerBlockItemsSync(): void;

// Asset.js
declare var Asset: Asset[];
declare var AssetGroup: AssetGroup[];
declare function AssetLoadDescription(Family: string): void;
declare function AssetGet(Family: string, Group: string, Name: string): Asset | null;
declare function AssetGroupGet(Family: string, Group: string): AssetGroup | null;

// Wardrobe.js
declare function WardrobeAssetBundle(A: Item): ItemBundle;
declare function WardrobeFastLoad(C: Character, W: number, Update: boolean): void;
// NMod
declare function WardrobeExtractBundle(B: any[]): {
	Name: string;
	Group: string;
	Color?: string | string[];
	Property?: any;
};

// Inventory.js
declare function InventoryAdd(C: Character, NewItemName: string, NewItemGroup: string, Push?: boolean): void;
declare function InventoryDelete(C: Character, DelItemName: string, DelItemGroup: string, Push?: boolean): void;
declare function InventoryGet(C: Character, AssetGroup: string): Item | null;
declare function InventoryGetLock(Item: Item): Item | null;
declare function InventoryRemove(C: Character, AssetGroup: string, Refresh?: boolean): void;
declare function InventoryItemHasEffect(Item: Item, Effect?: string, CheckProperties?: boolean): boolean;
declare function InventoryIsPermissionBlocked(C: Character, AssetName: string, AssetGroup: string, AssetType?: string): boolean;
declare function InventoryWear(C: Character, AssetName: string, AssetGroup: string, ItemColor: ItemColor, Difficulty: number, MemberNumber: number, Craft: CraftingItem | null, Refresh: boolean): void;
declare function InventoryWear(C: Character, AssetName: string, AssetGroup: string, ItemColor: ItemColor, Difficulty: number, MemberNumber: number, Craft: CraftingItem | null): void;

// GameLog.js
declare function LogAdd(NewLogName: string, NewLogGroup: string, NewLogValue: number, Push: boolean): void;
declare function LogDelete(DelLogName: string, DelLogGroup: string, Push: boolean): void;
declare function LogQuery(QueryLogName: string, QueryLogGroup: string): boolean;
declare function LogValue(QueryLogName: string, QueryLogGroup: string): number | null;

// GLDraw.js
declare var GLVersion: "webgl2" | "webgl" | "No WebGL";

// Mouse.js
declare function MouseIn(Left: number, Top: number, Width: number, Height: number): boolean;
declare function MouseXIn(Left: number, Width: number): boolean;
declare function MouseYIn(Top: number, Height: number): boolean;

// Preference.js
declare function PreferenceExit(): void;
declare var PreferenceDifficultyLevel: any;
declare var PreferenceDifficultyAccept: boolean;
declare var PreferenceMessage: string;
declare var PreferenceSubscreen: string;

// Login.js
declare function LoginMistressItems(): void;
declare function LoginStableItems(): void;

// Validation.js
declare const ValidationModifiableProperties: string[];
declare function ValidationCreateDiffParams(C: Character, sourceMemberNumber: number): AppearanceUpdateParameters;
declare function ValidationCanRemoveItem(previousItem: Item, params: AppearanceUpdateParameters, isSwap: boolean): boolean;
declare function ValidationCanAddItem(newItem: Item, params: AppearanceUpdateParameters): boolean;
declare function ValidationIsItemBlockedOrLimited(C: Character, sourceMemberNumber: any, groupName: string, assetName: string, type?: string | null): boolean;

// Text.js
declare function TextGet(TextTag: string): string;

// Struggle.js
declare var StruggleLockPickOrder: any;

// Screens/Room/KidnapLeague/KidnapLeague.js
declare function KidnapLeagueCanStartOnlineBounty(): boolean;
declare function KidnapLeagueOnlineBountyStart(): void;

// Screens/Character/InformationSheet/InformationSheet.js
declare var InformationSheetSelection: Character | null;

// Screens/Room/MainHall/MainHall.js
declare var MainHallRandomEventOdds: number;

// Screens/Room/MaidQuarters/MaidQuarters.js
declare var MaidQuartersMaid: Character;
declare var MaidQuartersOnlineDrinkFromOwner: boolean;

// Screens/Character/ItemColor/ItemColor.js
declare let ItemColorCharacter: Character | null;
declare let ItemColorItem: Item | null;
declare let ItemColorState: any;
declare let ItemColorPickerIndices: any[];
declare function ItemColorOnPickerChange(color: any): void;

// Speech.js
declare function SpeechGarbleByGagLevel(GagEffect: number, CD: string, IgnoreOOC: boolean): string;
declare function SpeechGarbleByGagLevel(GagEffect: number, CD: string): string;
declare function SpeechGetTotalGagLevel(C: Character, NoDeaf: boolean): number;

// ChatSearch.js
declare var ChatSearchMode: string;
declare var ChatSearchResult: any[];
declare var ChatSearchResultOffset: number;
declare function ChatSearchMuffle(inputText: string): string;

// Reputation.js
declare function ReputationGet(RepType: string): number;
declare function ReputationCharacterGet(C: Character, RepType: string): number;

// ChatCreate.js
declare var ChatCreateBackgroundSelect: string;
declare var ChatCreatePrivate: boolean | null;
declare var ChatCreateLocked: boolean | null;
declare var ChatCreateGame: string;
declare var ChatCreateLanguage: string;
declare var ChatBlockItemCategory: any[];

// Cell.js
declare function CellLock(LockTime: number): void;
