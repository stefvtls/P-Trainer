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

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService
    ) {}

  public loginSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;
    console.log(username)

    this.loginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          // this.router.navigateByUrl("/catalogue")
          this.trainerService.trainer = trainer;
          this.login.emit();
        },
        error: () => {

        }
      })
  }

}
