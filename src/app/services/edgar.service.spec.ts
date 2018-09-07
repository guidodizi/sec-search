import { TestBed, inject } from "@angular/core/testing";

import { EdgarService } from "./edgar.service";

describe("EdgarService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdgarService]
    });
  });

  it("should be created", inject([EdgarService], (service: EdgarService) => {
    expect(service).toBeTruthy();
  }));
});
