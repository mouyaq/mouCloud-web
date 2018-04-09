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
        // Once we received the response we don't need the password anymore
        delete this.user.password;
        //this.user = user; --> da problemas
        loginForm.reset();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.apiError = error.message;
      }
    )
  }

}
