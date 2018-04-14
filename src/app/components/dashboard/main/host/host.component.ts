import { Host } from './../../../../shared/model/host.model';
import { HostService } from './../../../../shared/services/host.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  host: Host = new Host();
  error: Object;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private hostService: HostService
  ) { }

  ngOnInit() {

  }

}
