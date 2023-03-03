import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage {
  constructor(
    private readonly router: Router,
    private trainerService: TrainerService) {
          // If a user is already logged in, redirect to catalogue page
    if (this.trainerService.trainer) {
      console.log("User logged in, redirecting to catalogue page...")
      this.handleLogin();
    }
  }
    // Handles login and redirects to catalogue page
  handleLogin(): void {
    this.router.navigateByUrl("/catalogue")
  }
}
