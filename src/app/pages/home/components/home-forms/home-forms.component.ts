import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import  data from '../../../../../assets/json/elencoComuni.json';
import { Cities } from 'src/app/models/cities.model';

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

    //this.colli.push(new Collo());
  }


/*   get aliases() {
    return (this.profileForm.get('aliases') as FormArray);
  }
  get weight(){
    return (this.profileForm.get('weight') as FormArray);
  }
  get height(){
    return (this.profileForm.get('height') as FormArray);
  }
  get width(){
    return (this.profileForm.get('width') as FormArray);
  }
  get depth(){
    return (this.profileForm.get('depth') as FormArray);
  }
 */
  constructor(private fb: FormBuilder) {


   }


/*   private _filteredCities(value: string): Cities[]{
    const filterValue = value.toLowerCase();

    return this.cities.filter(state => state.Name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filteredCap(value: string): Cities[]{
    const filterValue = value.toLowerCase();

    return this.cities.filter(state => state.Cap.toLowerCase().indexOf(filterValue) === 0);
  }
 */
 

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.spedizioneForm.value);
  }
}
