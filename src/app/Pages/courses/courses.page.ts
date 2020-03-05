import { DataService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.page.html',
	styleUrls: [ './courses.page.scss' ]
})
export class CoursesPage implements OnInit {
	private courses: string[] = [];

	constructor(private router: Router, private dataSv: DataService) {}

	ngOnInit() {
		this.dataSv.isDataBaseRdy().subscribe((data) => {
			if (data) {
				this.dataSv.getStudies().then((data) => {
					this.courses = data;
				});
			}
		});
	}

	toStudy(studie: string) {
		this.router.navigate([ 'classes' ], { state: { studie: studie } });
	}
}
