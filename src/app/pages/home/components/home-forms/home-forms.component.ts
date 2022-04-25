import { startWith, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import  data from '../../../../../assets/json/elencoComuni.json';
import { Cities } from 'src/app/models/cities.model';
import { ShippingService } from 'src/app/services/shipping.service';
import { flattenDeep, groupBy } from 'lodash';
import { NavigationExtras, Router } from '@angular/router';

class Collo {
  weight: number;
  height: number;
  width: number;
  depth: number;

  constructor() {
    this.weight = 0;
    this.height = 0;
    this.width = 0;
    this.depth = 0;
  }
}

@Component({
  selector: 'app-home-forms',
  templateUrl: './home-forms.component.html',
  styleUrls: ['./home-forms.component.scss']
})
export class HomeFormsComponent implements OnInit {

  colli = [new Collo()];

  spedizioneForm: FormGroup;
  fields: any;

  extras: NavigationExtras;

  citiesList: Cities[] = data; 

/*   cityCtrl = new FormControl();  
  filteredCity: Observable<Cities[]>;
  filteredCap: Observable<Cities[]>;

  cities: Cities[] = data;

  public fromField: Object = {value: 'Field'};
  public toField: Object = {value: 'Field'}; */

/*   profileForm = this.fb.group({
    fromPlace: ['', Validators.required],
    toPlace: [''],
    fromRegion: [''],
    toRegion: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ]),
    height: this.fb.array([
      this.fb.control('')
    ]),
    width: this.fb.array([
      this.fb.control('')
    ]),
    depth: this.fb.array([
      this.fb.control('')
    ]),
    weight: this.fb.array([
      this.fb.control('')
    ]),
  }); */

  ngOnInit() {
    this.fields = {
      isRequired: true,
      spedizione: {
        partenza: '',
        destinazione: '',
        pacchi: [
          new Collo()
        ],
      },
    };

    this.spedizioneForm = this.fb.group({
      spedizione: this.fb.group({
        partenza: new FormControl(''),
        destinazione: new FormControl(''),
        pacchi: this.fb.array([]),
      }),
    });
    this.patch();
  }

  patch() {
    const control = <FormArray>this.spedizioneForm.get('spedizione.pacchi');
    this.fields.spedizione.pacchi.forEach((x) => {
      control.push(this.patchValues(x));
    });
  }

  patchValues(collo: Collo) {
    return this.fb.group({
      weight: null,
      height: null,
      width: null,
      depth: null
    });
  }

  aggiungiCollo() {
    const control = <FormArray>this.spedizioneForm.get('spedizione.pacchi');
    control.push(this.patchValues(new Collo()));
    console.log("COSA è QUESTO?",control.controls)
    //this.colli.push(new Collo());
  }

  rimuoviCollo(formIndex: number) {
    const control = <FormArray>this.spedizioneForm.get('spedizione.pacchi');
    control.removeAt(formIndex);
    
  }

  duplicaCollo(formIndex: number) {
    const control = <FormArray>this.spedizioneForm.get('spedizione.pacchi');
    control.push(control.controls[formIndex])
    console.log("PEPEPE",control.controls[formIndex])
  }



  constructor(
    private fb: FormBuilder,
    private shippingService: ShippingService,
    private router: Router
    ) {

   }



 

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.shippingService.getRegione(this.spedizioneForm.get('spedizione.partenza').value);

    const capFrom = this.spedizioneForm.get('spedizione.partenza').value;
    const capTo = this.spedizioneForm.get('spedizione.destinazione').value;

    const colli = this.spedizioneForm.get('spedizione.pacchi').value;

    const carmine = colli.map(collo => this.shippingService.getShipping(capFrom, capTo, collo.weight,collo.height,collo.width, collo.depth));

    forkJoin(carmine).subscribe((res: any[]) => {
      const allValues = flattenDeep(res);
      const groupedValues = groupBy(allValues, this.getCourierId)
    
      const idCorrieri = Object.keys(groupedValues);

      const mappa = new Map<string, number>();
      for (let id of idCorrieri) {
        const spedizioni = groupedValues[id];
        const prezzo = spedizioni.map(x => x.Pricing).reduce((a, b) => a + b, 0);
        mappa.set(id, prezzo);
      }

      console.log(mappa);

      const righeTabella = res[0].map(valore => {
        return {
          CourierId: valore.CourierId,
          CourierName: valore.CourierName,
          ExpeditionFrom: valore.ExpeditionFrom,
          ExpeditionTo: valore.ExpeditionTo,
          MaxTimeExpedition: valore.MaxTimeExpedition,
          Pricing: mappa.get(valore.CourierId.toString())
        }
      })

      console.log(righeTabella);

      this.extras = {
        state: {
          righe: righeTabella
        }
      }

      this.router.navigate(['results'], this.extras);
    })

  }

  getCourierId(x) {
    return x.CourierId;
  }
}
