import { Injectable } from '@angular/core';
import { Trainer } from  "../components/models/trainer.model";
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer);
  }
}
