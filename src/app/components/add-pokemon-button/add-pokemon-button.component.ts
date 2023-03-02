import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output } from '@angular/core';
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

  public isCatched: boolean = false;

  @Input() pokemonId!: number;

  get loading(): boolean {
    return this.catchedService.loading;
  }

  constructor(
    private readonly catchedService: CatchedService,
    private readonly trainerService: TrainerService
  ) { }


  // checks if pokemon is already catched
  ngOnInit(): void {
    this.isCatched = this.trainerService.isAlreadyCatched(this.pokemonId);
  }

  // display a message if pokemon has been caught and saved 
  addPokemon(): void {
    this.catchedService.saveCatchedPokemon(this.pokemonId)
    .subscribe({
      next: (trainer: Trainer) => {
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
}}
