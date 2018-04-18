import { HostService } from './../services/host.service';
import { Host } from './../model/host.model';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class HostDetailsResolverGuard implements Resolve<Host> {

  constructor(
    private router: Router,
    private hostService: HostService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Host> {
    if (!route.params['id']) {
      return this.hostService.list()
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    }
    else {
      return this.hostService.get(route.params['id'])
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    }
  }

}
