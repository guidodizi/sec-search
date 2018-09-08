import { Component, OnInit } from "@angular/core";
import { EdgarService } from "../services/edgar.service";
import { StoreService } from "../services/storeServices/store.service";
import { ServerResponse, Filings } from "../interfaces/server";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  company: string;
  page: number;
  filings: Filings[];
  searching = false;
  constructor(private edgar: EdgarService, private store: StoreService) {}

  ngOnInit() {
    this.store.page.subscribe(page => (this.page = page));
    this.store.company.subscribe(company => (this.company = company));
    this.store.companyFilings.subscribe(filings => (this.filings = filings));
  }

  search() {
    this.searching = true;
    //set Company trading symbol onto store
    this.store.setCompany(this.company);
    //reset page
    this.store.setPage(0);

    //
    //request data and store it
    this.edgar.getFillings(this.company, this.page).subscribe(
      (data: ServerResponse) => {
        if (data.errors.length) {
          this.store.setErrors(data.errors);
        } else {
          this.store.setErrors([]);
          this.store.setCompanyName(data.result.name);
          //while not end of filings, update them
          if (data.result.filings.length) {
            this.store.setCompanyFilings(data.result.filings);
          } else {
            this.store.setCompanyFilings(this.filings);
          }
        }
        this.searching = false;
      },
      err => {
        this.store.setErrors([err]);
        this.searching = false;
      }
    );
  }
}
