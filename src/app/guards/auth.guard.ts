import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Trainer } from '../components/models/trainer.model';
import { StorageKeys } from '../enums/storage-keys.enum';
import { TrainerService } from '../services/trainer.service';
import { StorageUtil } from '../utils/storage.utils';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly trainerService: TrainerService
  ) {

  }

    // This method checks if the user is authorized to access the requested route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Check if the user is logged in and their information is stored in session storage
      if (this.trainerService.trainer && StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer)) {
      return true; // User is authorized to access the route
    } else {
      // User is not logged in or their information is not stored in session storage
      // Redirect the user to the login page
      this.router.navigateByUrl("/login");
      return false; // User is not authorized to access the route
    }
  }
}
