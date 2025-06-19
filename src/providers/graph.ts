import { exec } from "child_process";

export default class GraphProvider {
	constructor() {}

	async createPointNetworthGraph(
		x: any[],
		y1: any[],
		y2: any[],
		{
			delimeter = ",",
		}: {
			delimeter?: string;
		} = {}
	) {
		exec(
			`python src/libs/generate-graph.py "${x.join(delimeter)}" "${y1.join(delimeter)}" "${y2.join(delimeter)}"`,
			(error, stdout, stderr) => {
				if (error) {
					console.error(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.error(`stderr: ${stderr}`);
					return;
				}
				console.log(`Done`, stdout);
			}
		);
	}
}
