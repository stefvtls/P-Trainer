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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.trainerService.trainer && StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer)) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
