import { ManagePoint } from "./commands/admins/manage-point";
import { HourlyReward } from "./commands/hourly-reward";
import { Leaderboards } from "./commands/admins/leaderboards";
import { Point } from "./commands/point";
import { SlashCommand } from "./scripts/types/SlashCommand";
import { Statistics } from "./commands/admins/statistics";
import { RandomApproach } from "./commands/admins/random-approach";

export const slashCommandList: SlashCommand[] = [
	HourlyReward,
	Point,
	ManagePoint,
	Leaderboards,
	Statistics,
	RandomApproach,
];
