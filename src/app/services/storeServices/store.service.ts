import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Filings } from "../../interfaces/server";
@Injectable({
  providedIn: "root"
})
export class StoreService {
  private _errors: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _companyFilings: BehaviorSubject<Filings[]> = new BehaviorSubject([]);
  private _companyName: BehaviorSubject<string> = new BehaviorSubject(null);
  private _page: BehaviorSubject<number> = new BehaviorSubject(0);
  private _company: BehaviorSubject<string> = new BehaviorSubject("");

  public errors: Observable<string[]> = this._errors.asObservable();
  public companyFilings: Observable<Filings[]> = this._companyFilings.asObservable();
  public companyName: Observable<string> = this._companyName.asObservable();
  public page: Observable<number> = this._page.asObservable();
  public company: Observable<string> = this._company.asObservable();

  constructor() {}

  setErrors(errors: string[]) {
    this._errors.next(errors);
  }
  setCompanyFilings(filings: Filings[]) {
    this._companyFilings.next(filings);
  }
  setCompanyName(name: string) {
    this._companyName.next(name);
  }
  setPage(page: number) {
    this._page.next(page);
  }
  setCompany(company: string) {
    this._company.next(company);
  }
}
