import { SessionService } from './../services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const IsAuthenticated = this.sessionService.isAuthenticated();
      if (!IsAuthenticated) {
        this.router.navigate(['/login']);
      }
    return IsAuthenticated;
  }
}
