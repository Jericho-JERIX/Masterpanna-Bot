import {
	ActionRowBuilder,
	AttachmentBuilder,
	ButtonBuilder,
	ButtonStyle,
	GuildMember,
	SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import DiscordUserService from "../services/discordUser.service";
import { DiscordUserProfileEmbed } from "../components/embeds/DiscordUserProfileEmbed";
import PointTransactionService from "../services/pointTransaction.service";

export const Point: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("point")
		.setDescription("แสดงจำนวนแต้มของคุณ"),

	async onCommandExecuted(interaction) {
		const us = new DiscordUserService();

		const discordUser = await us.getDiscordUserByDiscordId(
			interaction.user.id
		);

		await interaction.reply({
			embeds: [
				DiscordUserProfileEmbed({
					discordUser,
					discordMember: interaction.member as GuildMember,
				}),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId("point-graph")
						.setLabel("ดูกราฟแต้ม (24 ชั่วโมง)")
						.setStyle(ButtonStyle.Primary)
				),
			],
		});
	},

	async onButtonPressed(interaction) {
		const ps = new PointTransactionService();
		await ps.getPointGraph("1235599123890180156");
		await new Promise((resolve) => setTimeout(resolve, 3000));
		const attachment = new AttachmentBuilder("./graph.png", {
			name: "graph.png",
		});
		switch (interaction.customId) {
			case "point-graph":
				await interaction.reply({
					files: [attachment],
					ephemeral: true,
				});
		}
	},
};
