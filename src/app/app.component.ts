import { Component } from '@angular/core';
import { ttt } from '../public/scripts/hbetest'
import { ShareService } from './share.service'
import { Iall } from '../public/classes'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareService]
})
export class AppComponent {
  title = 'app'

   // auf diese Variable wird im HTML-Code zugegriffen
   financeInfo: Iall

  constructor (private _shareService: ShareService ) {}

  testfunktion () {
    this._shareService.getExchangeRate().subscribe(
      (data1) => {
        console.log ("Testfunktion: " + JSON.stringify(data1))
        this.financeInfo = data1
        console.log ("financeinfo:" + JSON.stringify(this.financeInfo))
            },
      (err: any) => {
        console.log ("FEHLER: " + JSON.stringify(err) )
        }
      )
    }

    // let fullErg: {} = {};

// getExchangeRate()
  // .then((erg: Iergebnis) => {
  //   const Datum: Moment = moment(erg.datum);
  //   fullErg = { USD: erg };
  // })
  // .then(() => {
  //   getLatestSharePriceExtreme()
  //     .then(rec => {
  //       fullErg = Object.assign(fullErg, { EXTR: rec });
  //     })
  //     .then(() => {
  //       console.log("Alles: " + JSON.stringify(fullErg));
  //     });
  // })
  // .catch(err => err);
  // }
  }

