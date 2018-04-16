import { VmService } from './../services/vm.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Vm } from './../model/vm.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class VmDetailsResolverGuard implements Resolve<Vm> {

  constructor(
    private router: Router,
    private vmService: VmService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Vm> {
    if (!route.params['id']) {
      console.log('NO ID');
      return this.vmService.list()
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    }
    else {
      console.log('SI ID');
      return this.vmService.get(route.params['id'])
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    }
  }

}
