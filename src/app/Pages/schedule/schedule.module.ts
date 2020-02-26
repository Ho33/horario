import { DaysPipe } from './../../pipes/days.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import { HoursPipe } from 'src/app/pipes/hours.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
  ],
  declarations: [SchedulePage,DaysPipe,HoursPipe],
  exports:[DaysPipe,HoursPipe]
})
export class SchedulePageModule {}
