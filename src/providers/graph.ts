import { exec } from "child_process";

export default class GraphProvider {
	constructor() {}

	async createPointNetworthGraph(
		x: any[],
		y: any[],
		{
			delimeter = ",",
		}: {
			delimeter?: string;
		} = {}
	) {
		exec(
			`python src/libs/generate-graph.py "${x.join(delimeter)}" "${y.join(delimeter)}"`,
			(error, stdout, stderr) => {
				if (error) {
					console.error(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.error(`stderr: ${stderr}`);
					return;
				}
				console.log(`Done`);
			}
		);
	}
}
