import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import data from 'src/assets/json/elencoComuni.json';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }

  getShipping(
    luogoPartenza: string, 
    luogoDestinazione: string,
    peso: number,
    altezza: number,
    larghezza: number,
    profondita: number,
  ){
    const url = 'https://r6rrln42l4.execute-api.eu-west-1.amazonaws.com/dev/expeditions';
    const params = new HttpParams()
      .set('zoneFrom', this.getRegione(luogoPartenza))
      .set('zoneTO', this.getRegione(luogoDestinazione))
      .set('weight', Number(peso))
      .set('length', Number(altezza))
      .set('width', Number(larghezza))
      .set('depth', Number(profondita))
      

    return this.http.get<any>(url, { params });
  }

  //NON CANCELLARE FINO A QUANDO NON SEI SICURO SI QUELLO CHE STAI FACENDO
  // getRegione(cap: string): string {
  //   const object = data.find(comune => comune.Cap === cap);
  //   const region = this.parseRegion(object.Region);
  //   console.log(region);
  //   return region;
  // }

  getRegione(fieldInputComune: string): string {
    let cap = fieldInputComune.substring(fieldInputComune.indexOf('-')+1).trim();
    
    const object = data.find(comune => comune.Cap === cap);
    console.log("Campo inserito nella label",object);
    const region = this.parseRegion(object.Region);
    console.log(region);
    return region;
  }




  parseRegion(region: string) {
    switch (region) {
      case 'Sicilia':
      case 'Sardegna':
      case 'Calabria': {
        return 'Siciliy/Sardinia/Calabry';
      }

      default: {
        return 'Italy';
      }
    }
  }

}
