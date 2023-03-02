import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainerService } from '../services/trainer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly trainerService: TrainerService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("GUARD WORKING???");
    if (this.trainerService.trainer) {
      console.log("GUARD WORKING!!!");
      console.log("guarded: ", this.trainerService.trainer)
      return true;
    } else {
      console.log("GUARD WORKING!!!");
      console.log(" not guarded: ", this.trainerService.trainer)
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
