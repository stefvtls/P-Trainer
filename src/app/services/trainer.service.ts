import { Injectable } from '@angular/core';
import { Pokemon } from '../components/models/pokemon.model';
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
    // return StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer);
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer);
  }

  clearTrainer() {
    StorageUtil.sessionStorageRemove(StorageKeys.Trainer);
  }


  // check if trainer already catched that pokemon
  public isAlreadyCatched(pokemonId: number): boolean {
    if (this._trainer) {
      return Boolean(this.trainer?.pokemon.find((pokemon: Pokemon)=> pokemon.id === pokemonId));
    } else {
      return false;
    }
  }

  public catchPokemon(pokemon: Pokemon): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemon);
      // StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, this._trainer);
    }

  }

  public releasePokemon(pokemonId: number): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: Pokemon) => pokemon.id !== pokemonId);
      // StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, this._trainer);
    }

  }
}
