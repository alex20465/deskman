
import { app, BrowserWindow, screen, dialog } from 'electron';
import * as url from 'url';
import * as path from 'path';
import { BrowserWindowConstructorOptions } from 'electron/main';

export interface WindowManagerOptions {
    httpHost?: string
    httpPort?: number
    development?: boolean
}

export default class WindowManager {

    private bounds: Electron.Rectangle;

    private window: BrowserWindow;

    /**
     * mainly for development and realtime loads.
     */
    private httpLoad: boolean;
    private httpHost: string;
    private httpPort: number;
    private development: boolean;

    constructor(options: WindowManagerOptions = {}) {

        const { httpHost = 'localhost', httpPort = 3000, development = false } = options;

        let browserOptions: BrowserWindowConstructorOptions = { show: false };

        if (options.development === false) {
            browserOptions = {
                ...browserOptions,
                width: 500,
                height: 400,
                movable: false,
                skipTaskbar: true,
                frame: false,
                alwaysOnTop: true,
                show: false,
                closable: false,
            };
        } else {
            browserOptions = {
                ...browserOptions,
                width: 1000,
                height: 600,
                webPreferences: {
                    devTools: true,
                }
            }
        }


        this.window = new BrowserWindow(browserOptions);

        this.httpHost = httpHost;
        this.httpPort = httpPort;
        this.development = development;
    }

    public load() {
        this.bounds = this.window.getBounds();

        const fileBasedUrl = url.format({
            pathname: path.join(__dirname, '..', '..', 'index.html'),
            protocol: 'file:',
            slashes: true
        });

        this.window.loadURL(this.development ? this.getHttpURL() : fileBasedUrl);

        if (this.development === false)
            this.window.on('blur', () => this.window.hide());
    }

    public unload() {
        this.window.close();
    }

    public show() {

        if (this.window.isVisible()) {
            return;
        }

        this.window.show();
        let { size: { width, height } } = screen.getDisplayNearestPoint({
            x: this.bounds.x,
            y: this.bounds.y
        });
        const [w, h] = this.window.getSize();

        this.window.setPosition(width - w, height + h);
    }

    public close = () => this.window.close()

    private getHttpURL() {
        return `http://${this.httpHost}:${this.httpPort}`;
    }
}