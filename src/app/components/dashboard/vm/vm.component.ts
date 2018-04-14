import { VmService } from './../../../shared/services/vm.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Vm } from '../../../shared/model/vm.model';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit {
  vm: Vm = new Vm();
  error: Object;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private vmService: VmService
  ) { }

  ngOnInit() {

  }

}
