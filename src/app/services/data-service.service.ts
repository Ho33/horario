import { HoursOfSubjects } from './../Model/hours-of-subjects';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { Schedule } from '../Model/schedule';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	db: SQLiteObject;
	isOpen = false;
	private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(private plat: Platform, public storage: SQLite, public sqliteDbCopy: SqliteDbCopy) {
		this.plat.ready().then(() => {
			this.sqliteDbCopy
				.copy('Horario16a.db', 0)
				.then((res: any) => console.log('copiando bbd correcto', res))
				.catch((error: any) => console.error('copiando bbdd error', error));
			if (!this.isOpen) {
				this.storage = new SQLite();
				this.storage
					.create({ name: 'Horario16a.db', location: 'default', createFromLocation: 1 })
					.then((db: SQLiteObject) => {
						console.log('entro bien en el create');
						this.db = db;
						this.isOpen = true;
						this.dbReady.next(true);
					})
					.catch(() => console.log('create me echa de aqui'));
			}
		});
	}

	isDataBaseRdy() {
		return this.dbReady.asObservable();
	}

	getStudies(): Promise<string[]> {
		return new Promise((resolve, reject) => {
			this.db
				.executeSql('SELECT * FROM estudios', [])
				.then((data) => {
					console.log('entro en studies');
					if (data.rows.length > 0) {
						let arrayEstudios = [];
						for (var i = 0; i < data.rows.length; i++) {
							arrayEstudios.push({
								idEstudios: data.rows.item(i).idEstudios,
								nombre: data.rows.item(i).nombre
							});
						}
						console.log(arrayEstudios);
						resolve(arrayEstudios);
					}
				})
				.catch((error) => {
					console.log('error al leer studies ', error);
					reject(error);
				});
		});
	}

	getGroups(studies: string): Promise<string[]> {
		return new Promise((resolve, reject) => {
			this.db
				.executeSql(
					'SELECT * FROM grupo WHERE grupo.idEstudios = (SELECT idEstudios from estudios WHERE estudios.nombre = ?)',
					[ studies ]
				)
				.then((data) => {
					console.log('entro en groups');
					if (data.rows.length > 0) {
						let arrayGrupo = [];
						for (var i = 0; i < data.rows.length; i++) {
							arrayGrupo.push({
								idGrupo: data.rows.item(i).idGrupo,
								nombre: data.rows.item(i).nombre
							});
						}
						console.log(arrayGrupo);
						resolve(arrayGrupo);
					}
				})
				.catch((error) => {
					console.log('error al leer groups', error);
					reject(error);
				});
		});
	}
	async getSubjects(group: string) {
		return new Promise((resolve, reject) => {
			this.db
				.executeSql(
					'SELECT busqueda.eIdDiaSemana as idDia,idHorasSemana as idHora, busqueda.fNombre AS dia, descripcion, dNombre, completo FROM (SELECT p.idDiaClase AS pIdDiaClase, p.idHorasSemana AS pIdHorasSemana, p.idHoraClase AS pIdHoraClase, c.idmatsem AS cIdMatSem, c.idHoraClase AS cIdHoraClase, c.idMateria AS cIdMateria, d.idMateria AS dIdMateria, d.nombre AS dNombre, e.idGrupo AS eIdGrupo, e.idDiaClase AS eIdDiaClase, e.idDiaSemana AS eIdDiaSemana, f.idDiaSemana AS fIdDiaSemana, f.nombre AS fNombre, completo, g.* FROM ( SELECT h.* FROM horaClase AS h WHERE idHoraClase IN ( SELECT idHoraClase FROM materiahoraclase WHERE idHoraClase IN ( SELECT idHoraClase FROM horaClase WHERE idDiaClase IN ( SELECT idDiaClase FROM diaClase WHERE idGrupo = ?)))) AS p INNER JOIN materiahoraclase AS c ON c.idHoraClase = p.idHoraClase INNER JOIN materia AS d ON c.idMateria = d.IdMateria INNER JOIN diaClase AS e ON e.idDiaClase = p.idDiaClase INNER JOIN diaSemana AS f ON f.idDiaSemana = e.idDiaSemana INNER JOIN horasSemana AS g ON g.idHorasSemana = p.idHorasSemana ) AS busqueda;',
					[ parseInt(group) ]
				)
				.then((data) => {
					console.log('entro en schedule');
					if (data.rows.length > 0) {
						let arraySchedule = [];
						for (var i = 0; i < data.rows.length; i++) {
							arraySchedule.push({
								dia: data.rows.item(i).dia,
								descripcion: data.rows.item(i).descripcion,
								dNombre: data.rows.item(i).dNombre,
								completo: data.rows.item(i).completo,
								idDia: data.rows.item(i).idDia,
								idHora: data.rows.item(i).idHora
							});
						}
						console.log(arraySchedule);
						resolve(arraySchedule);
					}
				})
				.catch((error) => {
					console.log('error al leer schedule', error);
					reject(error);
				});
		});
	}
	convertToHorario(item) {
		let base = this.generarMatriz();
		let dia = 0;
		let hora = 0;
		console.log(item);
		for (var i = 0; i < item.length; i++) {
			dia = parseInt(item[i].idDia.trim()) - 1;
			hora = item[i].idHora - 1;
			base[hora][dia].setSubjects(item[i]);
		}
		console.log(base);
		return base;
	}

	private generarMatriz() {
		var messages: Array<HoursOfSubjects[]> = new Array(6);
		for (var i = 0; i < messages.length; i++) {
			var arrayTu: Array<HoursOfSubjects> = new Array(5);
			for (var j = 0; j < arrayTu.length; j++) {
				arrayTu[j] = new HoursOfSubjects([]);
			}
			messages[i] = arrayTu;
		}
		return messages;
	}
}
