import { GuildMember, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../scripts/types/SlashCommand";
import AdminService from "../../services/admin.service";
import DiscordUserService from "../../services/discordUser.service";
import { StatisticsEmbed } from "../../components/embeds/StatisticsEmbed";
import EconomyService from "../../services/economy.service";

export const Statistics: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("statistics")
		.setDescription("แสดงข้อมูลสถิติของการใช้งานของผู้ใช้งาน"),

	async onCommandExecuted(interaction) {
		const us = new DiscordUserService();
		const as = new AdminService();
        const es = new EconomyService();

		if (!as.isGuildMemberIsAdmin(interaction.member as GuildMember)) {
			await interaction.reply({
				content: "คุณไม่มีสิทธิในการใช้งานคำสั่งนี้",
				ephemeral: true,
			});
			return;
		}

		const discordUserList = await us.getDiscordUserList();

		const totalPoint = discordUserList.reduce(
			(acc, user) => acc + user.point,
			0
		);
		const totalUser = discordUserList.length;

		const averagePoint = totalPoint / totalUser;
		const maxPoint = Math.max(...discordUserList.map((user) => user.point));
		const minPoint = Math.min(...discordUserList.map((user) => user.point));

		const maxUser = discordUserList.find((user) => user.point === maxPoint);
		const minUser = discordUserList.find((user) => user.point === minPoint);

		if (!maxUser || !minUser) {
			await interaction.reply({
				content: "เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ",
				ephemeral: true,
			});
			return;
		}

		const sd = Math.sqrt(
			discordUserList.reduce(
				(acc, user) => acc + Math.pow(user.point - averagePoint, 2),
				0
			) / totalUser
		);

        const latestEconomy = await es.getLatestEconomy();

		await interaction.reply({
			embeds: [
				StatisticsEmbed({
					mean: averagePoint,
					maxUser,
					minUser,
					sd,
                    totalPoints: latestEconomy.totalPoint || 0,
                    totalPlayers: latestEconomy.totalUser || 0,
				}),
			],
			// ephemeral: true,
		});
	},
};
