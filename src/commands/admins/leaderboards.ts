import {
	ActionRowBuilder,
	ButtonBuilder,
	GuildMember,
	SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../scripts/types/SlashCommand";
import DiscordUserService from "../../services/discordUser.service";
import { LeaderboardsEmbed } from "../../components/embeds/LeaderboardsEmbed";
import { MobileViewButton } from "../../components/buttons/MobileViewButton";
import AdminService from "../../services/admin.service";

export const Leaderboards: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("leaderboards")
		.setDescription("แสดงตารางจัดอันดับ"),

	async onCommandExecuted(interaction) {
		const us = new DiscordUserService();
		const as = new AdminService();

		if (!as.isGuildMemberIsAdmin(interaction.member as GuildMember)) {
			await interaction.reply({
				content: "คุณไม่มีสิทธิในการใช้งานคำสั่งนี้",
				ephemeral: true,
			});
			return;
		}

		const discordUserList = await us.getDiscordUserList();
		const leaderboardEmbed = LeaderboardsEmbed({
			discordUserList: discordUserList.slice(0, 10),
			mobileView: false,
		});
		const mobileViewButton = MobileViewButton();
		await interaction.reply({
			embeds: [leaderboardEmbed],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					mobileViewButton
				),
			],
		});
	},

	async onButtonPressed(interaction) {
		const us = new DiscordUserService();
		const discordUserList = await us.getDiscordUserList();
		const leaderboardEmbed = LeaderboardsEmbed({
			discordUserList: discordUserList.slice(0, 10),
			mobileView: true,
		});
		await interaction.reply({
			embeds: [leaderboardEmbed],
			ephemeral: true,
		});
	},
};
