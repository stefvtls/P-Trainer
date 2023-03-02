import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CatchedService } from 'src/app/services/catched.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';

@Component({
  selector: 'add-pokemon-button',
  templateUrl: './add-pokemon-button.component.html',
  styleUrls: ['./add-pokemon-button.component.css']
})
export class AddPokemonButtonComponent {

  public loading: boolean = false;

  public isCatched: boolean = false;

  @Input() pokemonId!: number;

  // get loading(): boolean {
  //   return this.catchedService.loading;
  // }

  constructor(
    private readonly catchedService: CatchedService,
    private readonly trainerService: TrainerService,
    private readonly router: Router
  ) {}


  // checks if pokemon is already catched
  ngOnInit(): void {
    this.isCatched = this.trainerService.isAlreadyCatched(this.pokemonId);
  }

  // display a message if pokemon has been caught and saved 
  addPokemon(): void {
    this.loading = true;
    if (this.trainerService.trainer) {
      this.catchedService.saveCatchedPokemon(this.pokemonId)
      .subscribe({
        next: (trainer: Trainer) => {
          this.loading = false;
          this.isCatched = this.trainerService.isAlreadyCatched(this.pokemonId);
        }, 
        error: (error: HttpErrorResponse) => {
          console.log("ERROR: ", error.message);
        }
      })
      if (this.isCatched) {
        alert("released!");
      } else {
        alert("catched!");  
      }
      
    } else {
      alert("sorry, something went wrong and you were logged out. please log back in");
      this.router.navigateByUrl("/")
    }
    
}}
