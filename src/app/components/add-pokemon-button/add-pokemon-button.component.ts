import { Component, Input, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'add-pokemon-button',
  templateUrl: './add-pokemon-button.component.html',
  styleUrls: ['./add-pokemon-button.component.css']
})
export class AddPokemonButtonComponent {

  

  @Input() pokemonId: number | undefined ;
  // @Output() 

  addPokemon(): void {
    alert(`Catched Pokemon no. ${this.pokemonId}`)
  }
}
