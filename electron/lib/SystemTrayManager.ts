import { Menu, Tray, globalShortcut } from "electron";
import { EventEmitter } from "events";
import { join } from "path";

export enum SYSTEM_COMMANDS {
    OPEN = 0,
    CLOSE = 1
}

export default class SystemTrayManager {

    public emitter = new EventEmitter();

    private tray: Tray;

    constructor() {
        this.tray = new Tray(join(__dirname, '..', '..', 'logo192.png'))
    }

    public load() {
        this.tray.setContextMenu(this.getMenu());

        globalShortcut.register('Ctrl+Shift+a', () => {
            console.log("shortcut accepted");
        });
    }

    public on(command: SYSTEM_COMMANDS, listener: () => void) {
        this.emitter.on(`${command}`, listener);
    }

    private handleCommand(command: SYSTEM_COMMANDS) {
        this.emitter.emit(`${command}`);
        this.update();
    }

    private update() {
        this.tray.setContextMenu(this.getMenu());
    }

    private getMenu() {
        return Menu.buildFromTemplate([
            {
                commandId: SYSTEM_COMMANDS.OPEN,
                type: "normal",
                label: "Open",
                click: () => this.handleCommand(SYSTEM_COMMANDS.OPEN)
            },
            {
                commandId: SYSTEM_COMMANDS.CLOSE,
                type: "normal",
                label: "Exit",
                click: () => this.handleCommand(SYSTEM_COMMANDS.CLOSE)
            }
        ]);
    }
}