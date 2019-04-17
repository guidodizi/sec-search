import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, switchMap, take, filter } from "rxjs/operators";
import { throwError, of, BehaviorSubject } from "rxjs";
import { ServerResponse } from "../interfaces/server";
import { StoreService } from "./storeServices/store.service";

@Injectable({
  providedIn: "root"
})
export class EdgarService {
  private uri = "https://sec-search-backend.herokuapp.com";
  constructor(private http: HttpClient, private store: StoreService) {}

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

  getFillings(company: string, page: number, direction?: "next" | "previous") {
    const _result = new BehaviorSubject(undefined);

    this.http
      .get(this.uri + `/${company}/${page}`)
      .pipe(
        take(1),
        catchError(this.handleError)
      )
      .subscribe((data: ServerResponse) => {
        if (data.errors.length) {
          this.store.setErrors(data.errors);
        } else {
          this.store.setErrors([]);
          this.store.setCompanyName(data.result.name);
          if (data.result.filings.length) {
            this.store.setEndFilings(false);
            this.store.setCompanyFilings(data.result.filings);
            if (direction === "next") this.store.setPageNext();
            else if (direction === "previous") this.store.setPagePrevious();
          } else {
            this.store.setEndFilings(true);
          }
        }
        _result.next(data);
      });

    return _result.asObservable().pipe(filter(data => data !== undefined));
  }
}
