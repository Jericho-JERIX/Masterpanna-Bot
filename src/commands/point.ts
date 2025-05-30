import { GuildMember, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import UsersService from "../services/users.service";
import { UserProfileEmbed } from "../components/embeds/UserProfileEmbed";

export const Point: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("point")
		.setDescription("แสดงจำนวนแต้มของคุณ"),
    
	async onCommandExecuted(interaction) {
		const us = new UsersService();

		const user = await us.getUserByDiscordId(interaction.user.id);

		interaction.reply({
			embeds: [
				UserProfileEmbed({
					user,
					discordMember: interaction.member as GuildMember,
				}),
			],
		});
	},
};
