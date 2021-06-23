import { Component, OnInit } from '@angular/core';
import {Court, ReservableType, Reservation} from "../../types";
import {ReservableTypeService} from "../../services/reservable-type/reservable-type.service";
import {ReservableService} from "../../services/reservable/reservable.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {NewReservationFormComponent} from "../new-reservation-form/new-reservation-form.component";
import {ReservableEditFormComponent} from "../reservable-edit-form/reservable-edit-form.component";
import {ReservableTypeEditFormComponent} from "../reservable-type-edit-form/reservable-type-edit-form.component";

@Component({
  selector: 'app-court-management',
  templateUrl: './court-management.component.html',
  styleUrls: ['./court-management.component.css'],
  providers: [DialogService]
})
export class CourtManagementComponent implements OnInit {

  reservableTypes!: ReservableType[];

  cols: any[];

  constructor(private readonly reservableTypeService: ReservableTypeService,
              private readonly reservableService: ReservableService,
              private readonly dialogService: DialogService) {
    this.cols = [
      {field: 'expand', header: ''},
      { field: 'name', header: 'Typ Sportoviště'},
      { field: 'openFrom', header: 'Otevřeno od' },
      { field: 'openTo', header: 'Otevřeno do' },
      { field: 'buttons', header: '' },
    ];
  }

  ngOnInit(): void {
    this.reservableTypeService.getReservableTypes().subscribe(data => {
      this.reservableTypes = data;
    });
  }

  editReservableType(reservableType?: ReservableType) {
    let config = {
      header: '',
      width: '70%',
      contentStyle: {"height": "800px", "overflow": "auto"},
      data: {}
    };

    if (reservableType){
      config.header = 'Úprava typu sportoviště';
      config.data = {reservableType: reservableType}
    } else {
      config.header = "Nový typ sportoviště"
    }
    const ref = this.dialogService.open(ReservableTypeEditFormComponent, config)

    ref.onClose.subscribe((court: Court) =>{
      if (court){
        this.reservableTypeService.getReservableTypes().subscribe(data => this.reservableTypes = data);
      }
    });
  }

  deleteReservableType(reservableType: ReservableType) {
    if (reservableType.id){
      this.reservableTypeService.deleteReservableType(reservableType.id);
    }
    this.reservableTypes = this.reservableTypes.filter(p => p.id !== reservableType.id);
  }

  editCourt(court?: Court) {
    let config = {
      header: '',
      width: '70%',
      contentStyle: {"height": "400px", "overflow": "auto"},
      data: {}
    };

    if (court){
      config.header = 'Úprava sportoviště';
        config.data = {court: court}
      } else {
      config.header = "Nové sportoviště"
    }
    const ref = this.dialogService.open(ReservableEditFormComponent, config)

    ref.onClose.subscribe((court: Court) =>{
        if (court){
          this.reservableTypeService.getReservableTypes().subscribe(data => this.reservableTypes = data);
        }
    });
  }

  deleteCourt(court: Court) {
    if (court.id){

      this.reservableService.deleteCourt(court.id).subscribe(court => {
        const resType = this.reservableTypes.find(p => p.id === court.reservableTypeId);
        if (resType){
          const courts = resType?.reservableList?.filter(p => p.id !== court.id);
          resType.reservableList = courts;
          this.reservableTypes = [...this.reservableTypes.filter(a => a.id != resType.id), resType];
          this.reservableTypes.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        }
      });
      this.reservableTypeService.getReservableTypes().subscribe(data => this.reservableTypes = data);
    }
  }
}
