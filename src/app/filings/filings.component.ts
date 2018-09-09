import { Component, OnInit } from "@angular/core";
import { Filings, ServerResponse } from "../interfaces/server";
import { StoreService } from "../services/storeServices/store.service";
import { EdgarService } from "../services/edgar.service";

@Component({
  selector: "app-filings",
  templateUrl: "./filings.component.html",
  styleUrls: ["./filings.component.css"]
})
export class FilingsComponent implements OnInit {
  company: string;
  page: number;
  filings: Filings[];
  endData = false;
  constructor(private edgar: EdgarService, private store: StoreService) {}

  ngOnInit() {
    this.store.page.subscribe(page => (this.page = page));
    this.store.company.subscribe(company => (this.company = company));
    this.store.companyFilings.subscribe(filings => {
      //page requested exceeds available filings
      if (filings === this.filings) {
        this.endData = true;
      }
      this.filings = filings;
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
  }

  searchNextPage() {
    let newPage = ++this.page;
    this.edgar.getFillings(this.company, newPage).subscribe((data: ServerResponse) => {
      if (data.errors.length) {
        this.store.setErrors(data.errors);
      } else {
        this.store.setErrors([]);
        this.store.setCompanyName(data.result.name);
        if (data.result.filings.length) {
          this.store.setCompanyFilings(data.result.filings);
        } else {
          //when page exceeds available filings, server responds an empty array
          //page rollback
          newPage = --newPage;
          this.store.setCompanyFilings(this.filings);
        }
      }
      //save pagecount
      this.store.setPage(newPage);
    });
  }
  searchPreviousPage() {
    let newPage = --this.page;
    this.edgar.getFillings(this.company, newPage).subscribe((data: ServerResponse) => {
      if (data.errors.length) {
        this.store.setErrors(data.errors);
      } else {
        this.store.setErrors([]);
        this.store.setCompanyName(data.result.name);
        if (data.result.filings.length) {
          this.store.setCompanyFilings(data.result.filings);
        } else {
          //when page exceeds available filings, server responds an empty array
          //page rollback
          newPage = ++newPage;
          this.store.setCompanyFilings(this.filings);
        }
      }
      //save pagecount
      this.store.setPage(newPage);
    });
  }
}
