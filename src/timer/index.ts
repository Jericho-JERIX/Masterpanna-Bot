import { Client } from "discord.js";
import { Config } from "../config";
import RandomApproachService from "../services/randomApproach.service";
import { RandomApproachClaimButton } from "../components/buttons/RandomApproachClaimButton";
import { RandomApproachEmbed } from "../components/embeds/RandomApproach/RandomApproachEmbed";
import EconomyService from "../services/economy.service";

export class Timer {
	config: Config;
	client: Client;
	randomApproachService: RandomApproachService;
	economyService: EconomyService;

	constructor(client: Client, config: Config) {
		this.config = config;
		this.client = client;
		this.randomApproachService = new RandomApproachService();
		this.economyService = new EconomyService();
	}

	initTimer() {
		const now = new Date();
		const nextHour = new Date().setHours(now.getHours() + 1, 0, 0, 0);
		const nextHourTime = new Date(nextHour);

		const timeDiff = nextHourTime.getTime() - now.getTime();

		console.log(
			`🎯 Next Hourly Record Economy event scheduled at: ${nextHourTime.toLocaleString(
				this.config.timeFormat,
				{
					timeZone: this.config.timezone,
				}
			)} (in ${Math.floor(timeDiff / 60000)} minutes)`
		);
		setTimeout(async () => {
			await this.hourlyRecordEconomy();
			setInterval(async () => {
				await this.hourlyRecordEconomy();
			}, 60 * 60 * 1000);
		}, timeDiff);

		// const [tm, ts] = this.config.hhmm.split(":").map(Number)

		// const targetToday = new Date()
		// targetToday.setHours(tm, ts, 1, 0)

		// if (now > targetToday) {
		//     targetToday.setDate(targetToday.getDate() + 1)
		// }

		// let timeDiff = targetToday.getTime() - now.getTime()

		// const firstThreadTime = new Date(now.getTime() + timeDiff)
		// const formatTimeleft = convertSecondToHHMMSSMS(timeDiff)

		// const magicWord = getMagicWord()
		// console.log(`🕒 First thread will start at ${firstThreadTime.toLocaleString(this.config.timezone)} (${formatTimeleft} ms)`)
		// console.log(`🔑 Magic word:\n${JSON.stringify(magicWord)}\n--------------`)
		// setTimeout(() => {
		//     this.message.createDailyThread()
		//     setInterval(this.message.createDailyThread, 24* 60 * 60 * 1000)
		// }, timeDiff)

		// Random between 45*60*1000 and 2*60*60*1000
		const minTime = 45 * 60 * 1000; // 45 minutes
		const maxTime = 2 * 60 * 60 * 1000; // 2 hours

		this.scheduleNextRandomApproach(minTime, maxTime);
	}

	private scheduleNextRandomApproach(minTime: number, maxTime: number) {
		const randomTime =
			Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
		const nextEventTime = new Date(Date.now() + randomTime);

		console.log(
			`🎯 Next Random Approach event scheduled at: ${nextEventTime.toLocaleString(
				this.config.timeFormat,
				{
					timeZone: this.config.timezone,
				}
			)} (in ${Math.floor(randomTime / 60000)} minutes)`
		);

		setTimeout(async () => {
			try {
				await this.randomApproachEvent();
				// Schedule the next event
				this.scheduleNextRandomApproach(minTime, maxTime);
			} catch (error) {
				console.error("Error in random approach event:", error);
				// Still schedule the next event even if this one failed
				this.scheduleNextRandomApproach(minTime, maxTime);
			}
		}, randomTime);
	}

	async randomApproachEvent() {
		const rs = new RandomApproachService();

		const target = await rs.create(2);

		const channel = await this.client.channels.fetch(this.config.channelId);

		if (channel?.isTextBased()) {
			channel.send({
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
		} else {
			console.error("Channel not found");
		}
	}

	async hourlyRecordEconomy() {
		try {
			await this.economyService.createEconomy();
			console.log(
				`[Hourly Record Economy] Recorded at ${new Date().toLocaleString(
					this.config.timeFormat,
					{
						timeZone: this.config.timezone,
					}
				)}`
			);
		} catch (err) {
			console.error(
				`[Hourly Record Economy] Failed to record at ${new Date().toLocaleString(
					this.config.timeFormat,
					{
						timeZone: this.config.timezone,
					}
				)} with error:\n${err}`
			);
		}
	}
}
