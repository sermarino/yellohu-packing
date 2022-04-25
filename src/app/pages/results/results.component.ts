import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

class Riga {
  CourierId: number;
  CourierName: string;
  ExpeditionFrom: string;
  ExpeditionTo: string;
  MaxTimeExpedition: number;
  Pricing: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  sortedByExpedition: any[];
  sortedByPrice:any[];
  showMe: boolean = true;
  notShowMe: boolean = !this.showMe;
  righe: Riga[];

  constructor(
    private router: Router
  ) { 

    const state = this.router.getCurrentNavigation().extras.state;
    this.righe = state['righe'];
    console.log("queste sono le righe",this.righe);
    this.sortedByPrice = _.orderBy(this.righe, o => o.Pricing);
    console.log("queste sono le righe invertite",this.sortedByPrice);
    this.sortedByExpedition = this.righe.sort((a,b) => (a.MaxTimeExpedition > b.MaxTimeExpedition)? 1 : -1);

  }

  ngOnInit(): void {

  }

  orderResults(type: string): void{
    switch(type){
      case 'price':
      console.log(type);
        
      break;
      case 'speed':
      console.log(type);

        break
    }
    
  }

  selezioneLogo(corriere: string){
    let imgPATH: string;
    switch (corriere) {
      case 'TNT':
        imgPATH ="./../../../assets/images/tnt_logo.png" 
        break;
      case 'BRT_Ita':
      case 'BRT_Dpd':
      case 'BRT_Euro_Express':
        imgPATH ="./../../../assets/images/Brt_logo.jpeg" 
        break;
      case 'SDA_Extralarge':
        imgPATH ="./../../../assets/images/corriere-sda-logo.png" 
        break;
      case 'DHL_Economy_ITA':
      case 'DHL_Economy_Eu':
        imgPATH ="./../../../assets/images/dhl_logo.jpeg" 
        break;
    
      default:
        break;
    }

    return imgPATH;
  }

  toogleShowResults (){
    this.showMe =!this.showMe;
  }

  goHome() {
    this.router.navigate(['index']);
  }

}
