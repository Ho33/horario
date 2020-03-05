import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'hours'
})
export class HoursPipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		let hour = [ '8:15', '9:10', '10:05', '11:25', '12:15', '13:10' ];
		return hour[value];
	}
}
