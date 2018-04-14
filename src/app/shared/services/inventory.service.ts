import { Injectable } from '@angular/core';
import { VmsService } from './vms.service';

@Injectable()
export class InventoryService {

  constructor(private vms: VmsService) { }

}
