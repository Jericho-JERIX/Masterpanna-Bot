import { BaseInteraction, Client, Events, GatewayIntentBits, GuildMember } from "discord.js";
import * as dotenv from "dotenv";
import { checkPlayTimeIsExpired } from "./actions/checkPlayTimeIsExpired";
import { givePlayerRoleToUser } from "./actions/givePlayerRoleToUser";
import { slashCommandList } from "./commands";
import { onBotInit } from "./scripts/on-bot-init";
import { SlashCommandObject } from "./scripts/types/SlashCommandObject";
import DiscordUsersService from "./services/discordUser.service";
import { getSlashCommandObject } from "./utils/slash-command";

dotenv.config();
let commands: SlashCommandObject;
const us = new DiscordUsersService();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
});

client.once(Events.ClientReady, async (client) => {
	commands = getSlashCommandObject(slashCommandList);
    onBotInit(client);
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
	if (checkPlayTimeIsExpired(interaction)) {
		return;
	}

	await us.createIfDiscordUserNotExists(interaction.user.id);
	if (interaction.member instanceof GuildMember) {
		givePlayerRoleToUser(interaction.member);
	}
	if (interaction.isChatInputCommand()) {
		await commands[interaction.commandName].onCommandExecuted(interaction);
	} else if (interaction.isButton()) {
		await commands[
			String(
				interaction.message.interaction?.commandName ||
					interaction.customId.split("/")[0]
			)
		].onButtonPressed?.(interaction);
	} else if (interaction.isStringSelectMenu()) {
		await commands[
			String(
				interaction.message.interaction?.commandName ||
					interaction.customId.split("/")[0]
			)
		].onMenuSelected?.(interaction);
	} else if (interaction.isAutocomplete()) {
		await commands[String(interaction.commandName)].onAutoCompleteInputed?.(
			interaction
		);
	}
});

client.login(process.env.TOKEN);
