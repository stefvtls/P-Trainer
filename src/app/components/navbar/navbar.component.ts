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

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly router: Router,) {}

  logout() {
    this.trainerService.clearTrainer();
    this.router.navigateByUrl("/login")
  }

}
