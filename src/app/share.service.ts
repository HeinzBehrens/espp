import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {Iall} from '../public/classes'

// const dom = require ('xmldom').DOMParser

import * as domi from "xmldom";
const dom = domi.DOMParser;

import "rxjs/add/operator/map";
import * as moment from "moment";
// import { map } from "rxjs/add/operator"


@Injectable()
export class ShareService {
  urlDelayedQuote = "https://api.iextrading.com/1.0/stock/extr/delayed-quote";
  urlEZB = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
  urlCurrencyLayer = "http://apilayer.net/api/live?access_key=afda54b6cae48d88ab5356230377791e&currencies=EUR&source=USD&format=1";
  urlFinanceInfo = "http://localhost:3000/finance/shareUSDinfo";


  constructor(private http: HttpClient) {}

  testShare() {
    // lege die Observable an, die zurückgegeben wird
    // weise ihr zunächst den http.get zu
    const intProm: Observable<any> = this.http.get(this.urlDelayedQuote);
    // das Ergebnis ist ein JSON-string
    // mit MAP bekomme ich jedes einzelne Element... http.get liefert aber nur ein Element => den JSON-String
    // den forme ich in einen handhabbaren JSON-String um: Datum (als ISO-String) und Price
    return intProm.map((val: any, index: number) => {
      return {
        datum: moment(val["delayedPriceTime"]).toISOString(),
        price: val["delayedPrice"]
      };
    });
  }

  /** getExchangeRate
   * @description getExchangeRate holt die aktuelle (Schlusskurs des letzten Handelstages von der ECB)
   * @returns PROMISE<Iergebnis>
   *                 success: { datum: string_als_ISO_Datum, exchange_rate: number }
   *                 error: {Fehlermeldung der ECB}
   */
  getExchangeRate(): Observable<Iall> {
    console.log("vor prom");
    const prom: Observable<Iall> = this.http
      .get(this.urlFinanceInfo)
      // das Ergebnis ist ein JSON-string, der aber schon als JSON-Object formatiert wird
      // mit MAP bekomme ich jedes einzelne Element... http.get liefert aber nur ein Element => das JSON-Object
      // den forme ich in einen handhabbaren JSON-String um: Datum (als ISO-String) und Price
      .map((erg: Iall, ndx: number) => {
        console.log(erg);
        erg.EXTR.datum = moment(erg.EXTR.datum).format()
        erg.USD.datum = moment(erg.USD.datum).format()
        return erg;
      });
    return prom;
  }
}
