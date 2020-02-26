import { Schedule} from './../Model/schedule';

export abstract class  IDataService {
	abstract  getStudies(): Promise<string[]>;
	abstract async getGroups(studies: string): Promise<string[]>;
	abstract async getSchedule(group: string): Promise<Schedule>;
	abstract async getDescription(subjects: Array<string>): Promise<string[]>;
}
