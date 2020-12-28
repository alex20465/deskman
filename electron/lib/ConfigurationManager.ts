import { join } from "path";
import { homedir } from "os";
import { unlinkSync } from "fs";

const DataStore = require("data-store");

interface DataStore {
    set: (name: string, value: string) => void
    get: (name: string) => void
}

export class ConfigurationManager {
    private store: DataStore;
    private path: string;

    constructor() {
        this.path = join(homedir(), ".config", 'example-app');
        this.store = DataStore({ path: this.path });
    }

    async delete() {
        unlinkSync(this.path);
    }
}