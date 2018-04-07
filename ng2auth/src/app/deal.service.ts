import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class DealService {
  // Define the routes we are going to interact with
  private publicDealsUrl = 'http://localhost:3001/api/deals/public';
  private privateDealsUrl = 'http://localhost:3001/api/deals/private';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  // Implement a method to get the public deals
  getPublicDeals() {
    return this.http
      .get(this.publicDealsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a mathod to get private deals
  getPrivateDeals() {
    return this.http
      .get(this.privateDealsUrl, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // implement a method to handle errors
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

  // Create a shared method that shows an elert when someone buys a deal
  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
