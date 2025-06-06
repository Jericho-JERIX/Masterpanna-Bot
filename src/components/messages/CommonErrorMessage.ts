import { CommonErrorEmbed } from "../embeds/CommonErrorEmbed";

export function CommonErrorMessage() {
	return {
		embeds: [CommonErrorEmbed()],
		ephemeral: true,
	};
}
