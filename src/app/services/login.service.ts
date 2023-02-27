import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Trainer } from '../components/models/trainer.model';
import { environment } from 'src/environments/environment';

const { apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // dependency injection
  constructor(private readonly http: HttpClient) { }


  public login(username: string): Observable<Trainer>{
    return this.checkTrainer(username)
  }

  private checkTrainer(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      map((response: Trainer[])=> response.pop())
      )
  }

  private createTrainer(username: string): Observable<Trainer> {
    const newTrainer = {
      username,
      pokemon: []
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": ""

    });
  }


}
