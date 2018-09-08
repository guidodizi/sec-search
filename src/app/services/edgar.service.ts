import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { xml2json } from "xml-js";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EdgarService {
  private uri = "https://sec-search-backend.herokuapp.com";
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend Error => returned code ${error.status}`);
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened 😅 please try again later.");
  }

  getFillings(company: string, page: number) {
    return this.http.get(this.uri + `/${company}/${page}`).pipe(catchError(this.handleError));
  }
}
