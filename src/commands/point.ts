import { GuildMember, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import DiscordUserService from "../services/discordUser.service";
import { DiscordUserProfileEmbed } from "../components/embeds/DiscordUserProfileEmbed";

export const Point: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("point")
		.setDescription("แสดงจำนวนแต้มของคุณ"),
    
	async onCommandExecuted(interaction) {
		const us = new DiscordUserService();

		const discordUser = await us.getProfile(interaction.user.id);

		interaction.reply({
			embeds: [
				DiscordUserProfileEmbed({
					discordUser,
					discordMember: interaction.member as GuildMember,
                    totalTransactions: discordUser.totalTransactions,
                    pph: discordUser.pph.toFixed(3),
				}),
			],
		});
	},
};
