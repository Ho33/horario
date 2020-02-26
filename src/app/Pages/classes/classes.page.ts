import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-classes',
	templateUrl: './classes.page.html',
	styleUrls: [ './classes.page.scss' ]
})
export class ClassesPage implements OnInit {
	private studies: string[] = [];

	constructor(private route: Router, private dataSv: DataService) {}

	ngOnInit() {
		let currentStudie = this.route.getCurrentNavigation().extras.state.studie;
		this.dataSv.isDataBaseRdy().subscribe((data) => {
			if (data) {
				this.dataSv.getGroups(currentStudie).then((data) => {
					this.studies = data;
				});
			}
			console.log(currentStudie);
			console.log(this.studies);
		});
	}

	toSchedule(group: string) {
		this.route.navigate([ 'schedule' ], { state: { group: group } });
	}
}
