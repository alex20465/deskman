import * as electron from "electron";
import { ConfigurationManager } from "./ConfigurationManager";
import SystemTrayManager, { SYSTEM_COMMANDS } from "./SystemTrayManager";
import WindowManager from "./WindowManager";
import { getFingerprint } from "../helpers/cert";

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
            development: NODE_ENV === 'development'
        });
        this.systemTrayManager = new SystemTrayManager(this.config);
    }

    public load = async () => {

        this.systemTrayManager.load();
        this.windowManager.load();

        this.systemTrayManager.on(SYSTEM_COMMANDS.OPEN, () => {
            this.windowManager.show();
        });

        this.systemTrayManager.on(SYSTEM_COMMANDS.CLOSE, () => {
            this.windowManager.unload();
            electron.app.quit();
        });

        electron.app.on('certificate-error', (event, content, url, error, cert, callback) => {
            this.onCertificateError(cert)
                .then(allow => callback(allow))
                .catch((error) => console.error(error));
            event.preventDefault();
        });


    }

    private close = async () => {
        this.windowManager.close();
        electron.app.quit();
    }

    private onCertificateError = async (cert: electron.Certificate): Promise<boolean> => {
        const fingerprint = getFingerprint(cert.data);

        if (this.config.isTrusted(fingerprint)) {
            return true;
        }

        const { response } = await electron.dialog.showMessageBox(null, {
            type: "question",
            message: `Remote service certificate fingerprint: [${fingerprint}], allow secure remote connection ?`,
            buttons: ["Trust", "Reject"],
        });

        if (response === 1) {
            await this.close();
            return false;
        } else {
            this.config.trust(fingerprint);
            return true;
        }
    }
}