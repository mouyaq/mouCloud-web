import { User } from './../../../shared/model/user.model';
import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  apiError: string;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmitLogin(loginForm) {
    this.sessionService.authenticate(this.user).subscribe(
      (user) => {
        loginForm.reset();
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        this.apiError = error.message;
      }
    )
  }

}
