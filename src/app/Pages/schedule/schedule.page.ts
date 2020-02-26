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
	private subjects: string[] = [];
	private shedule: Schedule;
	private pipeDays: number[] = [ 0, 1, 2, 3, 4 ];
	private pipeHours: number[] = [ 0, 1, 2, 3, 4, 5 ];

	constructor(private route: Router, private dataSv: DataService, private toast: ToastController) {}

	ngOnInit() {
		let group = this.route.getCurrentNavigation().extras.state.group;
		console.log(group);
		this.dataSv.isDataBaseRdy().subscribe((data) => {
			if (data) {
				this.dataSv.getSubjects(group).then((data) => {
					data.forEach((data) => {
						this.subjects.push(data);
					});
					console.log(this.subjects);
				});
			}
			console.log(this.subjects + 'horario lleno again');
		});
	}
	getSubjects() {
		let hours: HoursOfSubjects[][];
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 6; j++) {
				let index = 0;
				let aux: string[] = [];
				//aux.push(this.subjects[index].dNombre);
				//hours[i][j].setSubjects(new HoursOfSubjects(aux));
				index++;
			}
		}
		console.log(this.shedule + 'horario lleno');
	}

	toastName(materia: HoursOfSubjects) {
		this.presentToast(materia);
	}

	async presentToast(subject) {
		let message = '';
		subject.forEach((data) => {
			message = message + ' ' + data.completo + '\n';
		});
		const toast = await this.toast.create({
			message: message,
			duration: 1500,
			color: 'blue'
		});
		toast.present();
	}
}
