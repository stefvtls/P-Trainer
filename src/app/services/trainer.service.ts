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

    // Getter for private _trainer
  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  // Setter for private _trainer
  set trainer(trainer: Trainer | undefined) {
        // Save the updated trainer object in sessionStorage using StorageUtil
    StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
        // Read the Trainer object from sessionStorage using StorageUtil and assign it to private _trainer
    this._trainer = StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer);
  }

    // Removes the Trainer object from sessionStorage
  clearTrainer() {
    StorageUtil.sessionStorageRemove(StorageKeys.Trainer);
  }


  // check if trainer already catched that pokemon
  public isAlreadyCatched(pokemonId: number): boolean {
    if (this._trainer) {
            // Check if the pokemon with the given pokemonId exists in the pokemon array of the trainer object
      return Boolean(this.trainer?.pokemon.find((pokemon: Pokemon)=> pokemon.id === pokemonId));
    } else {
      return false;
    }
  }

  // Add the given pokemon object to the pokemon array of the trainer object
  public catchPokemon(pokemon: Pokemon): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemon);
      // StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, this._trainer);
    }

  }

    // Remove the pokemon with the given pokemonId from the pokemon array of the trainer object
  public releasePokemon(pokemonId: number): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: Pokemon) => pokemon.id !== pokemonId);
      // StorageUtil.sessionStorageSave<Trainer>(StorageKeys.Trainer, this._trainer);
    }

  }
}
