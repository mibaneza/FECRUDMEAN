import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HijoI } from 'src/app/model/hijo';
import { ModelDialog } from 'src/app/model/model-dialog';
import { PersonaI } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss']
})
export class ModelDialogComponent {
  public contactForm: FormGroup;
  personalI: PersonaI;
  personalsI: PersonaI;
  hijoI: HijoI;
  name: string;
  personaList: Array<PersonaI>;
  public _id;
  public idPersonaga;
  constructor(
    private personaService: PersonaService,
    public dialogRef: MatDialogRef<ModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelDialog) {
    this.idPersonaga = this.onValidIdPer(this.data.tipo, this.data.model.idPersona);

    this.contactForm = this.createForm(this.data.tipo);
  }

  get idPersona() { return this.contactForm.get('idPersona'); }
  get nombre() { return this.contactForm.get('nombre'); }
  get apellido() { return this.contactForm.get('apellido'); }
  get fecNac() { return this.contactForm.get('fecNac'); }
  get fecIngreso() { return this.contactForm.get('fecIngreso'); }


  onValidIdPer(tipo, datadd): any {
    switch (tipo) {
      case 'persona':
        return false;
        break;
      case 'hijo':
        this.getPersona();
        return true;
        break;
      default:
        return false;
        break;
    }
  }

getPersona(){
  this.personaService.getpersonas().subscribe(
    personaData => {
      console.log(personaData)
      this.personaList = personaData;
      // console.log(personaData);
    },
    error => {
      console.log('ERROR ');
      console.log(error as any);
    });

}

  onForm(data: ModelDialog): any {
    if (this.contactForm.valid) {
      switch (data.tipo) {
        case 'persona':

          return data.model = this.contactForm.value;
        default:
          return data.model = this.hijoI = {
            _id: this._id,
            apellido: this.contactForm.value.apellido,
            nombre: this.contactForm.value.nombre,
            nombre_completo: this.contactForm.value.nombre,
            fecNac: this.contactForm.value.fecNac,
            fecIngreso: this.contactForm.value.fecIngreso,
            idPersona: this.contactForm.value.idPersona
          }
      }
    }
  }
  //idPersonaga

  createForm(tipo: string) {
    switch (tipo) {
      case 'persona':
        return new FormGroup({
          nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          fecNac: new FormControl('', [Validators.required]),
          fecIngreso: new FormControl('', [Validators.required])
        });

      default:
        return new FormGroup({
          idPersona: new FormControl('', [Validators.required]),
          nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          fecNac: new FormControl('', [Validators.required]),
          fecIngreso: new FormControl('', [Validators.required])
        });
    }
  }
  onNoClick(): void {
    this.contactForm.reset();
    this.dialogRef.close();
  }
}
