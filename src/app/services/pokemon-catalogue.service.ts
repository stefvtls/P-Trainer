import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import {PokeData, Pokemon} from "../modals/pokemon.modal";
import {PokemonRawData} from "../modals/pokemon.model.raw";

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
  private _pokemons: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;


  constructor(private http:HttpClient) { }

  public getIdAndImage(url: string): any {
    const id = url.split('/').filter(Boolean).pop();
    return {
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }

  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<PokeData>("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0")
      .subscribe({
        next: (pokemonData: PokeData) => {
          this._pokemons = pokemonData.results;
          // StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemon, this._pokemons);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public getDetails(pokemonUrl: string): PokemonRawData | null {
    this.http.get<PokemonRawData>(pokemonUrl)
      .subscribe({
        next: (pokemonData: PokemonRawData) => {
          return pokemonData;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
    return null;
  }

  get pokemons(): Pokemon[] {
    return this._pokemons
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

}
