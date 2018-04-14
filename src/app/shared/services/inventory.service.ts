import { Injectable } from '@angular/core';
import { VmService } from './vm.service';

@Injectable()
export class InventoryService {

  constructor(private vm: VmService) { }

}
