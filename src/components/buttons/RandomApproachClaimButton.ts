import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function RandomApproachClaimButton({
	id,
	disabled = false,
}: {
	id: string;
	disabled?: boolean;
}) {
	return new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setCustomId(id)
			.setLabel("รับรางวัล")
			.setStyle(ButtonStyle.Success)
			.setDisabled(disabled)
	);
}
