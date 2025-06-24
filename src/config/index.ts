import { readFileSync } from "fs";

export interface Config {
	adminUserIdList: string[];
	adminRoleIdList: string[];
	timeFormat: string;
	timezone: string;
	channelId: string;
	hourlyReward: {
		cooldown: number;
	};
	playerRoleId: string;
}

const data = readFileSync("./config.json", "utf-8");

export const config = JSON.parse(data) as Config;
