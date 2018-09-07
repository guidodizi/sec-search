import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { xml2json } from "xml-js";

@Injectable({
  providedIn: "root"
})
export class EdgarService {
  private uri = "https://sec-search-backend.herokuapp.com";
  constructor(private http: HttpClient) {}

  getFillings(company: string, page: number) {
    return this.http.get(this.uri + `/${company}/${page}`);
  }
}
