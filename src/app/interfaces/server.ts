export class ServerResponse {
  result: EdgarInfo;
  errors: string[];
}

export class EdgarInfo {
  name: string;
  filings: Filings[];
}

export class Filings {
  dateFiled: string;
  filingHREF: string;
  formName: string;
  type: string;
}
