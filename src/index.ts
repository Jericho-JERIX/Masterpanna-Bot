import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { BaseInteraction } from "discord.js";
import { SlashCommandObject } from "./scripts/types/SlashCommandObject";
import { slashCommandList } from "./commands";
import { getSlashCommandObject } from "./utils/slash-command";
import UsersService from "./services/users.service";

dotenv.config();
let commands: SlashCommandObject;
const us = new UsersService();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
});

client.once(Events.ClientReady, async (client) => {
	console.log(`✅ Ready! Logged in as ${client.user?.tag}`);
	commands = getSlashCommandObject(slashCommandList);
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
    await us.createIfUserNotExists(interaction.user.id);
	if (interaction.isChatInputCommand()) {
		await commands[interaction.commandName].onCommandExecuted(interaction);
	} else if (interaction.isButton()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onButtonPressed?.(interaction);
	} else if (interaction.isStringSelectMenu()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onMenuSelected?.(interaction);
	} else if (interaction.isAutocomplete()) {
		await commands[String(interaction.commandName)].onAutoCompleteInputed?.(
			interaction
		);
	}
});

client.login(process.env.TOKEN);
