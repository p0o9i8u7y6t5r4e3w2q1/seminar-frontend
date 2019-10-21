import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { DatePeriodRangeDto } from '../../../lib/api-request';
import { Equipment } from '../../../lib/api-response';
import { ApiService } from '../../basic';
import { EQUIPMENT_TYPE_OPTIONS } from '../../basic';

// FIXME 沒有運作正確，原因待查
@Component({
  selector: '[booking-equipment]',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit {
  public readonly equipTypeOptions = EQUIPMENT_TYPE_OPTIONS;

  @Input() timeRange: DatePeriodRangeDto;
  @Input() fullColspan: number = 4;

  selectedEquipTypes: string[] = [];
  equipmentIDs: string[] = [];
  allTypeEquipOptions: { [type: string]: Observable<Equipment[]> } = {};

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.addEquipment();
  }

  isTimeComplete(): boolean {
    console.log();
    return (
      this.timeRange.date != null &&
      this.timeRange.startPeriod !== '' &&
      this.timeRange.endPeriod !== ''
    );
  }

  fetchAvailableEquip(type: string): Observable<Equipment[]> {
    const body = {
      timeRange: this.timeRange,
      equipType: type,
    };

    return this.api
      .post('bookings/equipments/available', body)
      .pipe(shareReplay(1));
  }

  updateAllTypeEquipOptions() {
    if (this.isTimeComplete()) {
      for (const type of Object.keys(this.allTypeEquipOptions)) {
        this.allTypeEquipOptions[type] = this.fetchAvailableEquip(type);
      }
    }
  }

  selectedTypeOnChange(index: number) {
    console.log(this.selectedEquipTypes);
    const type = this.selectedEquipTypes[index];
    if (!this.isTimeComplete()) {
      // when update options can detect type key
      this.allTypeEquipOptions[type] = null;
    } else if (this.allTypeEquipOptions[type] == null) {
      this.allTypeEquipOptions[type] = this.fetchAvailableEquip(type);
    }
    console.log(this.allTypeEquipOptions);
    console.log(this.selectedEquipTypes);
  }

  addEquipment() {
    this.selectedEquipTypes.push('');
    this.equipmentIDs.push('');
  }

  removeEquipment(index: number) {
    this.selectedEquipTypes.splice(index, 1);
    this.equipmentIDs.splice(index, 1);
  }

  isNotSeletected(order: number, equipID: string): boolean {
    if (this.equipmentIDs[order] === equipID) {
      return true; // 使用者選擇的部分應該要顯示
    }

    for (let i = 0; i < this.equipmentIDs.length; i++) {
      if (i !== order && this.equipmentIDs[i] === equipID) {
        return false;
      }
    }
    return true;
  }

  getEquipmentIDs() {
    return this.equipmentIDs.filter(value => value !== '');
  }
}
