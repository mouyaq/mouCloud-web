import { Vm } from './../../../shared/model/vm.model';
import { VmService } from './../../../shared/services/vm.service';
import { Component, OnInit } from '@angular/core';
import { VmSpec } from '../../../shared/model/vmSpec.model';

@Component({
  selector: 'app-vm-create',
  templateUrl: './vm-create.component.html',
  styleUrls: ['./vm-create.component.css']
})
export class VmCreateComponent implements OnInit {
  vm: Vm = new Vm();

  constructor(private vmService: VmService) { }

  ngOnInit() {
  }

  onSubmit(newVmForm) {
    const vmSpec = {
      spec: {
        name: this.vm.name,
        guest_OS: this.vm.guest_OS,
        placement: {
          datastore: this.vm.datastore,
          folder: this.vm.folder,
          resource_pool: this.vm.resource_pool
        }
      }
    };

    this.vmService.create(vmSpec).subscribe(
      (vm) => {
        newVmForm.reset();
        console.log(vm);
      }
    );
  }

}
