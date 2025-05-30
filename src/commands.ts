import { HourlyReward } from "./commands/hourly-reward";
import { Ping } from "./commands/ping";
import { Point } from "./commands/point";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommandList: SlashCommand[] = [HourlyReward, Point];
