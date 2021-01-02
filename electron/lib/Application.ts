import { app } from "electron";
import { ConfigurationManager } from "./ConfigurationManager";
import SystemTrayManager, { SYSTEM_COMMANDS } from "./SystemTrayManager";
import WindowManager from "./WindowManager";

const { NODE_ENV } = process.env;


export default class Application {

    private windowManager: WindowManager;

    private systemTrayManager: SystemTrayManager;

    private config: ConfigurationManager;

    constructor() {
        this.config = new ConfigurationManager();

        this.windowManager = new WindowManager({
            httpHost: 'localhost',
            httpPort: 3000,
            httpLoad: NODE_ENV === 'development'
        });
        this.systemTrayManager = new SystemTrayManager(this.config);
    }

    public load() {
        this.systemTrayManager.load();
        this.windowManager.load();

        this.systemTrayManager.on(SYSTEM_COMMANDS.OPEN, () => {
            this.windowManager.show();
        });

        this.systemTrayManager.on(SYSTEM_COMMANDS.CLOSE, () => {
            this.windowManager.unload();
            app.quit();
        });
    }
}