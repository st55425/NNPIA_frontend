import {Component, Input, OnInit} from '@angular/core';
import {AnonymizedReservation, Page} from "../../types";
import {ReservationService} from "../../services/reservation/reservation.service";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-reservations-table',
  templateUrl: './user-reservations-table.component.html',
  styleUrls: ['./user-reservations-table.component.css'],
  providers: [MessageService]
})
export class UserReservationsTableComponent implements OnInit {

  anonymizedReservations!: AnonymizedReservation[];
  totalRecords!: number;

  @Input()
  deletable?: boolean;

  @Input()
  rows!: number;

  @Input()
  rowsPerPageOptions!: number[];

  private _username!: string;

  @Input()
  set username(value: string){
    this._username = value;
    if (this.dataLoader){
      this.dataLoader(this.username,0, this.rows ?? 10).subscribe(data =>{
        this.anonymizedReservations = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  get username() {
    return this._username;
  }

  @Input() dataLoader!: (username: string, page: number, size: number) => Observable<Page<AnonymizedReservation>>;


  cols!: any[];

  constructor(private readonly reservationService: ReservationService,
              private readonly messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'court', header: 'Název Sportoviště' },
      { field: 'from', header: 'Začátek' },
      { field: 'to', header: 'Konec' },
    ];
    if (this.deletable){
      this.cols = [...this.cols, { field: 'delete', header: 'Odstranit rezervaci'}]
    }
    this.dataLoader(this.username,0, this.rows ?? 10).subscribe(data =>{
      this.anonymizedReservations = data.content;
      this.totalRecords = data.totalElements;
    });
  }


  deleteReservation(reservation: AnonymizedReservation){
    this.anonymizedReservations = this.anonymizedReservations.filter((p) => p.id !== reservation.id);
    //TODO zobrazit
    this.messageService.add({severity: 'danger', summary: 'Rezervace odstraněna', detail:
        `Rezervace na kurt ${reservation.reservableName} v čase od ${reservation.timeFrom}
        do ${reservation.timeTo} byla odstraněna`});
    this.reservationService.deleteReservation(reservation.id);
  }

  loadReservations(event: LazyLoadEvent) {
    if (event.first !== undefined && event.rows){
      this.dataLoader(this.username,event.first/ event.rows, event.rows).subscribe(data =>{
        this.anonymizedReservations = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }
}
