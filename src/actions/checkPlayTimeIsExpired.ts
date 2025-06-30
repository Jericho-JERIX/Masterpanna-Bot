import { BaseInteraction, GuildMember } from "discord.js";
import AdminService from "../services/admin.service";
import { config } from "../config";
import { UnableToPlayNowEmbed } from "../components/embeds/UnableToPlayNowEmbed";

export function checkPlayTimeIsExpired(interaction: BaseInteraction) {
	const as = new AdminService();

    // Passed if member is admin
	if (
		interaction.member instanceof GuildMember &&
		as.isGuildMemberIsAdmin(interaction.member)
	) {
		return false;
	}

    // Passed if endTimestamp is not configured
	if (!config.endTimestamp) {
		return false;
	}

    // Passed if it is an allowed command
    if (interaction.isChatInputCommand() && interaction.commandName === "point") {
        return false;
    }

    // Passed if now is before end date
	const now = new Date();
	const endDate = new Date(config.endTimestamp);
	if (now <= endDate) {
		return false;
	}

    if (interaction.isRepliable()) {
        interaction.reply({
            embeds: [UnableToPlayNowEmbed()],
            ephemeral: true
        });
    }

    return true;
}
