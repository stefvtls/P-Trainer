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


  constructor(
    private readonly http: HttpClient,
    private readonly pokeCatalogue: PokeCatalogueService,
    private readonly trainerService: TrainerService
  ) {}

  public saveCatchedPokemon(pokemonId: number): Observable<Trainer> {
        // Check if the trainer exists in the database
    if (!this.trainerService.trainer) {
      throw new Error("the trainer does not exist in our database");
    } 
        // Get the trainer object
    let trainer: Trainer = this.trainerService.trainer;
        // Get the pokemon object by id from the pokeCatalogue service
    const pokemon: Pokemon | undefined = this.pokeCatalogue.pokemonById(pokemonId);

        // Throw an error if the pokemon does not exist
    if (!pokemon) {
      throw new Error("this pokemon does not exist");
    }

        // Check if the pokemon is already caught, if it is, release it, otherwise, catch it
    if (this.trainerService.isAlreadyCatched(pokemonId)) {
      this.trainerService.releasePokemon(pokemonId);

    } else {
      this.trainerService.catchPokemon(pokemon);
    }

        // Set the http headers with the api key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey as string
    })


    // Send a PATCH request to update the trainer's caught pokemon list on the server
    return this.http.patch<Trainer>(
      `${apiTrainers}/${trainer.id}`,
      {pokemon: [...trainer.pokemon]}, //updated trainer
      {headers}).pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        }),
      )

      
  }







}
