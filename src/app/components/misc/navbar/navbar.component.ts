import { Subscription } from 'rxjs/Subscription';
import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.userSubscription = this.sessionService.onUserChanges()
      .subscribe(user => this.user = user);
  }

}
