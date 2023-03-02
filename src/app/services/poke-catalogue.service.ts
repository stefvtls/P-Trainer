import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Pokemon, PokeApiResponse, PokemonApiResponse } from '../components/models/pokemon.model';


const apiPoke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"


@Injectable({
  providedIn: 'root'
})
export class PokeCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  
  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }


  public findAllPokemon(): void {

    // fetched cached data from poke API
    if (this._pokemons.length > 0 || this._loading === true) {
      return;
    }


    this._loading = true;
    this.http.get<PokeApiResponse>(apiPoke)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (response => {
        console.log(response.results);
          this._pokemons  = response.results.map(poke => {
          let urlArraySplitted = poke.url.split("/");
          let extractedId = Number(urlArraySplitted[(urlArraySplitted.length) - 2]);
          let pokemon: Pokemon = {
            id: extractedId,
            name: poke.name,
            url: poke.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractedId}.png`,
          }
          return pokemon;
        })
      }),
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public pokemonById(id: number): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon ) => pokemon.id === id);
  }
}
