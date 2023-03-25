import { MainMenu } from "./mainmenu";
import { GuiSubscreen, setSubscreen } from "./settingUtils";

export class GuiLipstick extends GuiSubscreen {
    readonly character : PlayerCharacter;

    constructor(character: PlayerCharacter) {
		super();
		this.character = character;
    }

    Run() {
		MainCanvas.textAlign = "center";
		DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "BCX main menu");
	}

	Click() {
		if (MouseIn(1815, 75, 90, 90)) return this.Exit();
	}

	Exit() {
		setSubscreen(new MainMenu(this.character));
	}
}