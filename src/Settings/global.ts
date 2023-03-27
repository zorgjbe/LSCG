import { GuiSubscreen } from "./settingBase";

export class GuiGlobal extends GuiSubscreen {
    readonly character : PlayerCharacter;

    constructor(character: PlayerCharacter) {
		super();
		this.character = character;
    }

    Run() {
		MainCanvas.textAlign = "center";
		DrawText("- LSCG Global -", 225, 125, "Black", "Gray");
		DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "BCX main menu");
	}

	Click() {
		if (MouseIn(1815, 75, 90, 90)) return this.Exit();
	}
}