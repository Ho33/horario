import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'days'
})
export class DaysPipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		let days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];
		return days[value];
	}
}
