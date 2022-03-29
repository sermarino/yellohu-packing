import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import  data from '../../../../../assets/json/elencoComuni.json';
// import data from '../../../../../assets/json/prova.json';




export interface Cities {
  Name: string;
  Province: string;
  Region: string;
  Cap?: string;
  Field: string;
}

@Component({
  selector: 'app-home-input',
  templateUrl: './home-input.component.html',
  styleUrls: ['./home-input.component.scss']
})
export class HomeInputComponent implements OnInit {
  title = 'angular-material-autocomplete';

  cityCtrl = new FormControl();
  filteredCity: Observable<Cities[]>;
  filteredCap: Observable<Cities[]>;

  cities: Cities[] = data;
 

  constructor() {
    this.filteredCity = this.cityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(employee => employee ? this._filtercities(employee) : this.cities.slice())
      );

    this.filteredCap = this.cityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(employee => employee ? this._filterCap(employee) : this.cities.slice())
      );
  }

  //TODO chiedere a frenck come fare la storia che posso cercare sia il cap che la città, funzione unica =D 

  private _filtercities(value: string): Cities[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(state => state.Name.toLowerCase().indexOf(filterValue) === 0);
  }  

  private _filterCap(value: string): Cities[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(state => state.Cap.indexOf(filterValue) === 0);
  }  
  
  ngOnInit(): void { console.log(this.cities);
   }


}
