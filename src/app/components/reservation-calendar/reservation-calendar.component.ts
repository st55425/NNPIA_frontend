import { Calendar } from '@fullcalendar/core';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent implements OnInit {
  @Input()
  events?: any[];

  options: any;

  constructor() {
  }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      minTime: '7:00:00',
      maxTime: '22:00:00',
      locale: 'cs',
      height: 'auto',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      editable: false,
      dateClick: (info: any) =>  {
        //více viz: https://fullcalendar.io/docs/v4/dateClick
        console.log(info.date);
      },
      eventClick: (info: any) => {
        //více viz: https://fullcalendar.io/docs/v4/eventClick
        console.log('Event: ' + info.event.title);
        console.log('Id: ' + info.event.id);
        console.log('View: ' + info.view.type);
    }
    };
  }

}
