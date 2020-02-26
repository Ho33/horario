import { HoursOfSubjects } from './hours-of-subjects';

export class Schedule {
	private group: string;
	private studies: string;
	private quadrant: HoursOfSubjects[][];

	constructor(quadrant: HoursOfSubjects[][]) {
		this.quadrant = quadrant;
	}

	public getGroup(): string {
		return this.group;
	}

	public setGroup(group: string): void {
		this.group = group;
	}

	public getStudies(): string {
		return this.studies;
	}

	public setStudies(studies: string): void {
		this.studies = studies;
	}

	public getQuadrant(): HoursOfSubjects[][] {
		return this.quadrant;
	}

	public setQuadrant(quadrant: HoursOfSubjects[][]): void {
		this.quadrant = quadrant;
	}
}
