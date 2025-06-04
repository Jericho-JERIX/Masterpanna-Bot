import { SlashCommandBuilder } from "discord.js";
import { HourlyRewardEmbed } from "../components/embeds/HourlyRewardEmbed";
import { SlashCommand } from "../scripts/types/SlashCommand";
import DiscordUserService from "../services/discordUser.service";
import CooldownError from "../errors/hourly-reward.error";
import { HourlyRewardCooldownEmbed } from "../components/embeds/HourlyRewardCooldownEmbed";

export const HourlyReward: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("free")
		.setDescription("รับแต้มประจำชั่วโมง"),

	async onCommandExecuted(interaction) {
		const us = new DiscordUserService();

		try {
			const result = await us.recieveHourlyReward(interaction.user.id);

			await interaction.reply({
				embeds: [
					HourlyRewardEmbed({
						discordId: interaction.user.id,
						recievedPoints: result.recievedPoints,
						totalPoints: result.point,
					}),
				],
			});
		} catch (error) {
			if (error instanceof CooldownError) {
				const discordUser = await us.getDiscordUserByDiscordId(interaction.user.id);

                if (!discordUser.lastClaimedAt) {
                    throw Error("DiscordUser has no last claimed at");
                }

				await interaction.reply({
					embeds: [
						HourlyRewardCooldownEmbed({
							discordId: interaction.user.id,
							totalPoints: discordUser.point,
							lastClaimedAt: discordUser.lastClaimedAt,
						}),
					],
					ephemeral: true,
				});
			}
		}
	},
};
