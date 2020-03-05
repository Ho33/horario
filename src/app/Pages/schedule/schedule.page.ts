import { IDataService } from 'src/app/Interfaces/IdataService';
import { Schedule } from './../../Model/schedule';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';
import { ISubject } from 'src/app/Interfaces/Isubject';
import { ToastController } from '@ionic/angular';
import { HoursOfSubjects } from 'src/app/Model/hours-of-subjects';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.page.html',
	styleUrls: [ './schedule.page.scss' ]
})
export class SchedulePage implements OnInit {
	private schedule: Schedule;
	private pipeDays: number[] = [ 0, 1, 2, 3, 4 ];
	private pipeHours: number[] = [ 0, 1, 2, 3, 4, 5 ];

	constructor(private route: Router, private dataSv: DataService, private toast: ToastController) {}

	ngOnInit() {
		this.schedule = this.route.getCurrentNavigation().extras.state.schedule;
	}

	async presentToast(nameComplete) {
		
		const toast = await this.toast.create({
			message: nameComplete,
			duration: 1500,
			color: 'blue'
		});
		toast.present();
	}
}
