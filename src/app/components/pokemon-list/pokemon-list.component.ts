import { Component, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  @Input() pokemons: Pokemon[] = [];

}
