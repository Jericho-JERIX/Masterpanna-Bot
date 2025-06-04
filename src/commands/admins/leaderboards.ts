import {
	ActionRowBuilder,
	ButtonBuilder,
	GuildMember,
	SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../scripts/types/SlashCommand";
import UsersService from "../../services/users.service";
import { LeaderboardsEmbed } from "../../components/embeds/LeaderboardsEmbed";
import { MobileViewButton } from "../../components/buttons/MobileViewButton";
import AdminService from "../../services/admin.service";

export const Leaderboards: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("leaderboards")
		.setDescription("แสดงตารางจัดอันดับ"),

	async onCommandExecuted(interaction) {
		const us = new UsersService();
		const as = new AdminService();

        if (!as.isGuildMemberIsAdmin(interaction.member as GuildMember)) {
            await interaction.reply({
                content: "คุณไม่มีสิทธิในการใช้งานคำสั่งนี้",
                ephemeral: true,
            })
            return;
        }

		const userList = await us.getUserList();
		const leaderboardEmbed = LeaderboardsEmbed({
			userList: userList.slice(0, 10),
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
		const us = new UsersService();
		const userList = await us.getUserList();
		const leaderboardEmbed = LeaderboardsEmbed({
			userList: userList.slice(0, 10),
			mobileView: true,
		});
		await interaction.reply({
			embeds: [leaderboardEmbed],
			ephemeral: true,
		});
	},
};
