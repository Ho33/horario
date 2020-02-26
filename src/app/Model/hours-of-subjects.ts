export class HoursOfSubjects {
	private subjects: string[];

	constructor(subjects: string[]) {
		this.subjects = subjects;
	}

	public getSubjects(): string[] {
		return this.subjects;
	}
	public setSubjects(subjects: string[]) {
		this.subjects = subjects;
	}
}
