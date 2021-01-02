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
    shortcuts: ShortcutsConfig
}

const DEFAULT_CONFIG: Configurations = {
    shortcuts: {
        open: "Ctrl+Shift+a"
    }
}

export class ConfigurationManager {
    private store: DataStore;
    private path: string;

    constructor() {
        this.path = join(homedir(), ".config", 'example-app');
        this.store = DataStore({ path: this.path });
    }

    get shortcuts(): ShortcutsConfig {
        return this.get('shortcuts');
    }

    async delete() {
        unlinkSync(this.path);
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