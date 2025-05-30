import { config } from "../config";

export default class HourlyRewardUtils {
	static getResetDate(lastClaimedAt: Date) {
		return new Date(lastClaimedAt.getTime() + config.hourlyReward.cooldown);
	}
}
