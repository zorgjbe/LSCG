import { GuiSubscreen } from "./settingBase";

export class GuiGlobal extends GuiSubscreen {
    readonly character : PlayerCharacter;

    constructor(character: PlayerCharacter) {
		super();
		this.character = character;
    }

    Run() {
		var prev = MainCanvas.textAlign;
		MainCanvas.textAlign = "left";

		DrawText("- LSCG Global -", 225, 125, "Black", "Gray");
		DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "BCX main menu");

		// Enabled	[true/false]
		DrawText("Enabled:", GuiSubscreen.START_X, 190, "Black", "Gray");
		DrawCheckbox(GuiSubscreen.START_X + 600, 190 - 32, 64, 64, "", this.settings.enabled ?? true);

		MainCanvas.textAlign = prev;
	}
}