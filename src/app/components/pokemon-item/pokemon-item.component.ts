import { Component, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent {
  // the input property to pass a Pokemon object to this component
  @Input() pokemon?: Pokemon;

}
