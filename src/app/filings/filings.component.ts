import { Component, OnInit, OnDestroy } from "@angular/core";
import { Filings } from "../interfaces/server";
import { StoreService } from "../services/storeServices/store.service";
import { EdgarService } from "../services/edgar.service";
import { Subscription, Observable } from "rxjs";
import { take } from "rxjs/internal/operators/take";

@Component({
  selector: "app-filings",
  templateUrl: "./filings.component.html",
  styleUrls: ["./filings.component.css"]
})
export class FilingsComponent implements OnInit, OnDestroy {
  pageSub: Subscription;
  companySub: Subscription;

  company: string;
  page: number;
  filings: Observable<Filings[]>;
  endData: Observable<boolean>;

  constructor(private edgar: EdgarService, public store: StoreService) {}

  ngOnInit() {
    this.endData = this.store.endFilings;
    this.filings = this.store.companyFilings;
    this.pageSub = this.store.page.subscribe(page => (this.page = page));
    this.companySub = this.store.company.subscribe(company => (this.company = company));
  }

  searchNextPage() {
    this.edgar
      .getFillings(this.company, this.page + 1, "next")
      .pipe(take(1))
      .subscribe(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      });
  }
  searchPreviousPage() {
    this.edgar
      .getFillings(this.company, this.page - 1, "previous")
      .pipe(take(1))
      .subscribe(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      });
  }

  ngOnDestroy(): void {
    if (this.pageSub) this.pageSub.unsubscribe();
    if (this.companySub) this.companySub.unsubscribe();
  }
}
