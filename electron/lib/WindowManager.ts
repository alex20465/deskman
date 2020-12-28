
import { BrowserWindow, screen } from 'electron';
import * as url from 'url';
import * as path from 'path';

export interface WindowManagerOptions {
    httpLoad?: boolean
    httpHost?: string
    httpPort?: number
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

    constructor(options: WindowManagerOptions = {}) {
        this.window = new BrowserWindow({
            width: 500,
            height: 400,
            movable: false,
            skipTaskbar: true,
            frame: false,
            alwaysOnTop: true,
            show: false,
            closable: false,
        });

        const { httpHost = 'localhost', httpLoad = false, httpPort = 3000 } = options;

        this.httpHost = httpHost;
        this.httpPort = httpPort;
        this.httpLoad = httpLoad;
    }

    public load() {
        this.bounds = this.window.getBounds();

        const fileBasedUrl = url.format({
            pathname: path.join(__dirname, '..', '..', 'index.html'),
            protocol: 'file:',
            slashes: true
        });

        this.window.loadURL(this.httpLoad ? this.getHttpURL() : fileBasedUrl);

        this.window.on('blur', () => this.window.hide());
    }

    public unload() {
        this.window.close();
    }

    public show() {
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