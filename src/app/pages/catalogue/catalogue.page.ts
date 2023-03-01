import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/components/models/pokemon.model';
import { PokeCatalogueService } from 'src/app/services/poke-catalogue.service';

@Component({
  selector: 'catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage {

  

  get pokemons(): Pokemon[] {
    return this.pokeService.pokemons;
  }

  get loading(): boolean {
    return this.pokeService.loading;
  }

  get error(): string {
    return this.pokeService.error;
  }



  constructor(
    private readonly pokeService: PokeCatalogueService,
  ) { }

  ngOnInit(): void {
    this.pokeService.findAllPokemon(); 
  }



}
