import {Component, OnInit} from '@angular/core';
import {PokemonCatalogueService} from "../../services/pokemon-catalogue.service";

@Component({
  selector: 'catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit{

  constructor(private pokemonCatalogueService:PokemonCatalogueService) {
  }

 ngOnInit() : void {
    this.pokemonCatalogueService.findAllPokemons()
  }

  pokemonList(){
    return this.pokemonCatalogueService.pokemons
  }

}
