import { readFileSync } from "fs";

export interface Config {
	adminRole: string[];
	hourlyReward: {
		cooldown: number;
	};
}

const data = readFileSync("./config.json", "utf-8");

export const config = JSON.parse(data) as Config;
