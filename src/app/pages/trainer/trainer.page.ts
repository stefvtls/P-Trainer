import { Component } from '@angular/core';
import { Pokemon } from 'src/app/components/models/pokemon.model';
import { Trainer } from 'src/app/components/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage {



  get trainer(): Trainer | undefined {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer
  } else {
    return undefined;
  }
  }

  get catched(): Pokemon[] {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon;
    } else {
      return [];
    }
  }
  constructor( private trainerService: TrainerService) {}


}
