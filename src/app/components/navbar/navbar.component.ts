import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from '../models/trainer.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  // retrieves the current logged-in trainer from TrainerService
  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  
  constructor(
    private readonly trainerService: TrainerService,
    private readonly router: Router
    ) {}

  // logs out the current trainer by resetting the trainer data in TrainerService and navigates to login page
  logout() {
    this.trainerService.trainer = undefined;
    this.trainerService.clearTrainer();
    this.router.navigateByUrl("/login");
  }

}
