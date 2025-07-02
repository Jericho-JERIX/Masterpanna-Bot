import {
    SlashCommandBuilder
} from "discord.js";
import { RandomApproachClaimButton } from "../../components/buttons/RandomApproachClaimButton";
import { RandomApproachAlreadyClaimedEmbed } from "../../components/embeds/RandomApproach/RandomApproachAlreadyClaimedEmbed";
import { RandomApproachClaimSuccessEmbed } from "../../components/embeds/RandomApproach/RandomApproachClaimSuccessEmbed";
import { RandomApproachEmbed } from "../../components/embeds/RandomApproach/RandomApproachEmbed";
import { CommonErrorMessage } from "../../components/messages/CommonErrorMessage";
import { SlashCommand } from "../../scripts/types/SlashCommand";
import RandomApproachService, {
    AlreadyClaimedError,
} from "../../services/randomApproach.service";

export const RandomApproach: SlashCommand = {
	slashCommandBuilder: new SlashCommandBuilder()
		.setName("random-approach")
		.setDescription("สร้าง Random Approach Event ตอนนี้")
		.addIntegerOption((option) =>
			option.setName("reward-points").setDescription("จำนวนแต้มที่จะจ่าย")
		),

	async onCommandExecuted(interaction) {
		let rewardPoints = interaction.options.getInteger("reward-points");
		if (!rewardPoints) {
			rewardPoints = 2;
		}

		const rs = new RandomApproachService();

		const target = await rs.create(rewardPoints);

		await interaction.reply({
			embeds: [
				RandomApproachEmbed({
					data: target,
				}),
			],
			components: [
				RandomApproachClaimButton({
					id: `random-approach/${target.id}`,
				}),
			],
		});
	},

	async onButtonPressed(interaction) {
		const id = interaction.customId.split("/")[1];
		const rs = new RandomApproachService();

		try {
			const target = await rs.claim(id, interaction.user.id);

			await interaction.update({
				content: `<@${interaction.user.id}>`,
				embeds: [
					RandomApproachEmbed({
						data: target.randomApproach,
						discordId: target.discordUser.id,
					}),
				],
				components: [
					RandomApproachClaimButton({
						id: `random-approach/${target.randomApproach.id}`,
						disabled: true,
					}),
				],
			});

			const timeDiffMs =
				target.randomApproach.claimedAt!.getTime() -
				target.randomApproach.createdAt.getTime();

            const fastestRa = await rs.getFastestClaimed();

			await interaction.followUp({
				embeds: [
					RandomApproachClaimSuccessEmbed({
						discordId: interaction.user.id,
						rewardPoints: target.randomApproach.rewardPoints,
						point: target.discordUser.point,
						timeDiffMs,
                        fastestRa: fastestRa?.randomApproach,
					}),
				],
			});
		} catch (error) {
			if (error instanceof AlreadyClaimedError) {
				await interaction.reply({
					embeds: [RandomApproachAlreadyClaimedEmbed()],
					ephemeral: true,
				});
			} else {
				await interaction.reply(CommonErrorMessage());
				console.error(error);
			}
		}
	},
};
