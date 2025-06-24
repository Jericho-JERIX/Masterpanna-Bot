import { Client, Events, GatewayIntentBits, GuildMember } from "discord.js";
import * as dotenv from "dotenv";
import { BaseInteraction } from "discord.js";
import { SlashCommandObject } from "./scripts/types/SlashCommandObject";
import { slashCommandList } from "./commands";
import { getSlashCommandObject } from "./utils/slash-command";
import DiscordUsersService from "./services/discordUser.service";
import { Timer } from "./timer";
import { config } from "./config";
import { givePlayerRoleToUser } from "./actions/givePlayerRoleToUser";

dotenv.config();
let commands: SlashCommandObject;
const us = new DiscordUsersService();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
});

client.once(Events.ClientReady, async (client) => {
	console.log(`✅ Ready! Logged in as ${client.user?.tag}`);
	commands = getSlashCommandObject(slashCommandList);
	const timer = new Timer(client, config);
	timer.initTimer();
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
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
