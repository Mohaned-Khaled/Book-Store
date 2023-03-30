import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Subject, throwError } from 'rxjs';
import { environment } from 'src/environment/enviroment';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  isLoading = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  fetchQuotes() {
    this.isLoading.next(true);

    return this.http
      .get('https://api.api-ninjas.com/v1/quotes', {
        headers: new HttpHeaders().append('X-Api-Key', environment.NINJA_KEY),
      })
      .pipe(
        map((data) => {
          return data[0].quote;
        }),
        catchError((error) => {
          return throwError(error.message);
        })
      );
  }
}
