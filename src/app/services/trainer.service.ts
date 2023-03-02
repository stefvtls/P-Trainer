import { Injectable } from '@angular/core';
import { Trainer } from  "../components/models/trainer.model";
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.utils';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {PokemonCatalogueService} from "./pokemon-catalogue.service";
import {} from "../modals/pokemon.modal";
import {Pokemon} from "../components/models/pokemon.model";
import { tap } from 'rxjs';

const { apiTrainers, apiKey} = environment;

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

  addPokemonToTrainer(name:string){

    // @ts-ignore
    const pokemon:Pokemon|undefined=this.pokemonCata.pokemonById(name);


    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });


    this.http.patch<Trainer>(`${apiTrainers}/${this._trainer?.id}`,
        {
          pokemon: [...this._trainer!.pokemon, pokemon?.name],
        },
        {
          headers,
        }
      ).pipe(tap((newTrainer:Trainer)=>{
        this._trainer=newTrainer
    }))
  }

  constructor(private http:HttpClient,private pokemonCata:PokemonCatalogueService) {
    this._trainer = StorageUtil.sessionStorageRead<Trainer>(StorageKeys.Trainer);
  }
}
