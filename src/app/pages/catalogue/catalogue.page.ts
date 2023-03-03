import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/components/models/pokemon.model';
import { PokeCatalogueService } from 'src/app/services/poke-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage {


  // Getter to get the list of all pokemons
  get pokemons(): Pokemon[] {
    return this.pokeService.pokemons;
  }
  // Getter to get the loading status of the Pokemon Catalogue service
  get loading(): boolean {
    return this.pokeService.loading;
  }

  // Getter to get the error message from the Pokemon Catalogue service
  get error(): string {
    return this.pokeService.error;
  }



  constructor(
    private readonly pokeService: PokeCatalogueService
  ) { }

    // Initializes the Pokemon Catalogue page by calling the findAllPokemon method of the PokeCatalogueService
  ngOnInit(): void {
    this.pokeService.findAllPokemon(); 
  }



}
