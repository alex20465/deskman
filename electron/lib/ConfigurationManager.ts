import { join } from "path";
import { homedir } from "os";
import { unlinkSync } from "fs";

const DataStore = require("data-store");

interface DataStore {
    set: (name: string, value: string) => void
    get: (name: string) => void
    has: (name: string) => boolean
}

interface ShortcutsConfig {
    open: string
}

interface Configurations {
    shortcuts: ShortcutsConfig,
    endpoint: string,
    trusted: string[]
}

const DEFAULT_CONFIG: Configurations = {
    endpoint: "",
    shortcuts: {
        open: "Ctrl+Shift+a"
    },
    trusted: []
}

export class ConfigurationManager {
    private store: DataStore;
    private path: string;

    constructor() {
        this.path = join(homedir(), ".config", 'deskman');
        this.store = DataStore({ path: this.path });
    }

    get shortcuts(): ShortcutsConfig {
        return this.get('shortcuts');
    }

    get trusted(): string[] {
        return this.get('trusted');
    }

    get endpoint(): string | null {
        return this.get('endpoint') || null;
    }

    isTrusted(fingerprint: string) {
        return this.trusted.indexOf(fingerprint) !== -1;
    }

    trust(fingerprint: string) {
        this.set('trusted', [...this.trusted, fingerprint]);
    }

    async delete() {
        unlinkSync(this.path);
    }

    private set(name: string, value: any) {
        this.store.set(name, value);
    }

    private get(name: string) {
        if (this.store.has(name)) {
            return this.store.get(name);
        } else if (name in DEFAULT_CONFIG) {
            return (DEFAULT_CONFIG as any)[name];
        } else {
            return null;
        }
    }
}