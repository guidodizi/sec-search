import { Component } from "@angular/core";
import { StoreService } from "./services/storeServices/store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Sec Edgar search";
  constructor(public store: StoreService) {}
}
