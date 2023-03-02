import { Injectable } from '@angular/core';
import { PokeCatalogueService } from './poke-catalogue.service';
import { TrainerService } from './trainer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../components/models/pokemon.model';
import { Trainer } from '../components/models/trainer.model';
import { finalize, Observable, tap } from 'rxjs';

const { apiKey, apiTrainers} =  environment;

@Injectable({
  providedIn: 'root'
})
export class CatchedService {

  
  private _loading: boolean = false;
  // getter
  get loading(): boolean{
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly pokeCatalogue: PokeCatalogueService,
    private readonly trainerService: TrainerService
  ) {}

  public saveCatchedPokemon(pokemonId: number): Observable<Trainer> {

    if (!this.trainerService.trainer) {
      throw new Error("the trainer does not exist in our database");
    } 

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined = this.pokeCatalogue.pokemonById(pokemonId);

    if (!pokemon) {
      throw new Error("this pokemon does not exist");
    }

    if (this.trainerService.isAlreadyCatched(pokemonId)) {
      this.trainerService.releasePokemon(pokemonId);
    } else {
      this.trainerService.catchPokemon(pokemon);
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })


    this._loading = true;
    return this.http.patch<Trainer>(
      `${apiTrainers}/${trainer.id}`,
      {pokemon: [...trainer.pokemon]}, //updated trainer
      {headers}).pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        }),
        finalize(()=>this._loading = false)
      )

      
  }







}
