import { Client } from "discord.js";
import { config } from "../config";
import { Timer } from "../timer";

export async function onBotInit(client: Client<true>) {
	console.log(`✅ Ready! Logged in as ${client.user?.tag}`);

	// Initialize scheduler
	const timer = new Timer(client, config);
	timer.initTimer();

	// Display time-left before end of event
	if (!config.endTimestamp) {
		console.log("🕒 No end timestamp configured");
	} else {
		const endDate = new Date(config.endTimestamp);
		console.log(
			`🕒 End of event in ${endDate.toLocaleString("en-US", {
				timeZone: config.timezone,
			})}`
		);
	}
}
