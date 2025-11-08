import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { ref } from "process";

class ConfigService {
    private config: Record<string, any> = {};

    constructor() {
        this.refresh();
    }

    refresh() {
        const configPath = "/config/config.json";
        this.config = JSON.parse(readFileSync(configPath, "utf-8"));
    }

    refreshSpotdlConfig() {
        // Load config from /config/config_spotdl.json
        const externalConfigPath = "/config/config_spotdl.json";
        const spotdlConfigDir = join(homedir(), ".spotdl");
        const spotdlConfigPath = join(spotdlConfigDir, "config.json");

        if (existsSync(externalConfigPath)) {
            const externalConfig = JSON.parse(readFileSync(externalConfigPath, "utf-8"));
            
            // Ensure the spotdl config directory exists
            if (!existsSync(spotdlConfigDir)) {
                mkdirSync(spotdlConfigDir, { recursive: true });
            }
            
            // Read existing config or create empty object
            let spotdlConfig = {};
            if (existsSync(spotdlConfigPath)) {
                spotdlConfig = JSON.parse(readFileSync(spotdlConfigPath, "utf-8"));
            }
            
            // Merge configs (external config overwrites existing)
            const mergedConfig = { ...spotdlConfig, ...externalConfig };
            
            // Write merged config
            writeFileSync(spotdlConfigPath, JSON.stringify(mergedConfig, null, 2));
            console.log("✅ spotdl config updated");
        }
    }

    get(key: string): any {
        return this.config[key];
    }
}

export const configService = new ConfigService();

