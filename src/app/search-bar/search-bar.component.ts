import { Component } from "@angular/core";
import { EdgarService } from "../services/edgar.service";
import { StoreService } from "../services/storeServices/store.service";
import { Filings } from "../interfaces/server";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent {
  // ngModel of input
  company: string;

  searching = false;

  constructor(private edgar: EdgarService, private store: StoreService) {}

  search() {
    this.searching = true;
    // set Company trading symbol onto store
    this.store.setCompany(this.company);
    // reset page
    this.store.setPage(0);
    this.edgar.getFillings(this.company, 0).subscribe(() => (this.searching = false));
  }
}
