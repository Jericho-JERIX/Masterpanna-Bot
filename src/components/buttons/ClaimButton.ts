import { ButtonBuilder, ButtonStyle } from "discord.js";

export function ClaimButton({
	id,
	disabled = false,
}: {
	id: string;
	disabled?: boolean;
}) {
	return new ButtonBuilder()
		.setCustomId(id)
		.setLabel("รับรางวัล")
		.setStyle(ButtonStyle.Success)
		.setDisabled(disabled);
}
