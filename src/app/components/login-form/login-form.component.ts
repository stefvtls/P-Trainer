import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { Trainer } from "../models/trainer.model";
import { Router } from "@angular/router";
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
// Declaring an event to emit when user logs in successfully
  @Output() login: EventEmitter<void> = new EventEmitter();

    // Injecting necessary services
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService
    ) {}

     // Login submit method to handle login form submission
  public loginSubmit(loginForm: NgForm): void {

     // Extracting username from the submitted form data
    const { username } = loginForm.value;

     // Returning if username is not present or has less than 3 characters
    if (!username || username.length <3){
      return;
    }
 // Calling login service's login method to authenticate user's credentials
    this.loginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          this.trainerService.trainer = trainer;
          this.login.emit();
        },
        error: () => {

        }
      })
  }

}
