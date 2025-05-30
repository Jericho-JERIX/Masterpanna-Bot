import { readFileSync } from "fs";

export interface Config {
	adminUserIdList: string[];
	adminRoleIdList: string[];
	hourlyReward: {
		cooldown: number;
	};  
}

const data = readFileSync("./config.json", "utf-8");

export const config = JSON.parse(data) as Config;
