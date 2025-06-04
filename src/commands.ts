import { ManagePoint } from "./commands/admins/manage-point";
import { HourlyReward } from "./commands/hourly-reward";
import { Leaderboards } from "./commands/admins/leaderboards";
import { Point } from "./commands/point";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommandList: SlashCommand[] = [
  HourlyReward,
  Point,
  ManagePoint,
  Leaderboards,
];
