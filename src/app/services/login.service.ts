import { Injectable } from '@angular/core';
import { map, switchMap, of, Observable } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Trainer } from '../components/models/trainer.model';
import { environment } from 'src/environments/environment';

const { apiTrainers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // dependency injection
  constructor(private readonly http: HttpClient) { }


  public login(username: string): Observable<Trainer>{
    return this.checkTrainer(username)
    .pipe(
      switchMap((trainer: Trainer | undefined) => {
        if (trainer === undefined) {
          return this.createTrainer(username);
        }
        return of(trainer);
      })
    )
  }

  // GET
  private checkTrainer(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      map((response: Trainer[])=> response.pop())
      )
  }


  // POST
  private createTrainer(username: string): Observable<Trainer> {

    const newTrainer = {
      username,
      pokemon: []
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<Trainer>(apiTrainers, newTrainer, {headers})
  }


}
