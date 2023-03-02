import { Component } from '@angular/core';
import { PokeCatalogueService } from './services/poke-catalogue.service';
import { TrainerService } from './services/trainer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-pokemon-trainer';

  constructor( 
    private readonly trainerService: TrainerService,
    private readonly pokemonService: PokeCatalogueService
  ) {}

  ngOnInit(): void {
    if (this.trainerService.trainer) {
      this.pokemonService.findAllPokemon();
    }
  }
}
