import { Component } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from '../models/trainer.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  constructor(private readonly trainerService: TrainerService) {}

}
