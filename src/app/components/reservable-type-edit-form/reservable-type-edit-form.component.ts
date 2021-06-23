import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ReservablePrice, ReservableType} from "../../types";
import {ReservableTypeService} from "../../services/reservable-type/reservable-type.service";

@Component({
  selector: 'app-reservable-type-edit-form',
  templateUrl: './reservable-type-edit-form.component.html',
  styleUrls: ['./reservable-type-edit-form.component.css']
})
export class ReservableTypeEditFormComponent implements OnInit {

  pricesCtrl = this.fb.array([]);

  new = false;

  resTypeForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    openFrom: [new Date(2020, 1,1,8,0,0), Validators.required],
    openTo: [new Date(2020, 1,1,22,0,0), Validators.required],
    defaultPrice: [undefined, Validators.required],
    prices: this.pricesCtrl
  })

  constructor(private readonly fb: FormBuilder,
              private readonly config: DynamicDialogConfig,
              private readonly ref: DynamicDialogRef,
              private readonly reservableTypeService: ReservableTypeService) {
  }

  ngOnInit(): void {
    if (this.config.data.reservableType) {
      const resType = this.config.data.reservableType as ReservableType;
      for (const price of resType.prices ?? []) {
        this.addPrice(price);
      }
      this.resTypeForm.patchValue({
        id: resType.id,
        name: resType.name,
        openFrom: new Date(resType.openFrom),
        openTo: new Date(resType.openTo),
        defaultPrice: resType.defaultPrice
      })
      this.new = false;
    } else {
      this.new = true;
    }
  }

  addPrice(price?: ReservablePrice){
    if (price){
      this.pricesCtrl.push(this.fb.group({
          weekDays: [price.weekDays],
          weekendsAndHolidays: [price.weekendsAndHolidays],
          timeFrom: [new Date(price.timeFrom)],
          timeTo: [new Date(price.timeTo)],
          price: [price.price]
        }
      ))
    }else {
      this.pricesCtrl.push(this.fb.group({
          weekDays: [false],
          weekendsAndHolidays: [false],
          timeFrom: [new Date(2020, 1,1,8,0,0)],
          timeTo: [new Date(2020, 1,1,22,0,0)],
          price: []
        }
      ))
    }
  }

  onSubmit() {
    if (this.new){
      this.reservableTypeService.createReservableType(this.resTypeForm.value as ReservableType).subscribe(data => this.ref.close(data));
    }else{
      this.reservableTypeService.updateReservableType(this.resTypeForm.value as ReservableType).subscribe(data => this.ref.close(data));
    }
  }
}
