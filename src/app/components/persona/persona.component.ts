import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelDialog } from 'src/app/model/model-dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { PersonaI } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ModelDialogComponent } from '../dialog/model-dialog/model-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["fecNac", "fecIngreso", "nombre_completo", "actions"];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];






  personaList: Array<PersonaI>;

  personaI: PersonaI;
  personaID: PersonaI;
  persona0: PersonaI;
  personaDialog: ModelDialog;
  public search;


  index: number;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private personaService: PersonaService,
    private rutaActiva: ActivatedRoute
  ) {

    // this.dataSource = new MatTableDataSource(this.getPersonaI());
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  ngAfterViewInit() {
    this.search = this.rutaActiva.snapshot.params.hijosr;
    if(this.search){
      this.getPersonaIfindID(this.search);
    }else{
    this.getPersonaI();
  }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }
  getPersonaIfindID(search) {
    this.personaService.getpersona(search).subscribe(
      personaData => {
        this.personaList.push(personaData);
        this.dataSource.data = this.personaList;
        this.dataSource._updateChangeSubscription();
     
        // console.log(personaData);
      },
      error => {
        console.log('ERROR ');
        console.log(error as any);
      });
    return this.personaList;
  }

  

  getPersonaI(): Array<PersonaI> {
    this.personaService.getpersonas().subscribe(
      personaData => {
        this.dataSource.data = personaData;
        console.log()
        this.personaList = personaData;
        // console.log(personaData);
      },
      error => {
        console.log('ERROR ');
        console.log(error as any);
      });
    return this.personaList;
  }

  savePersona() {
    if (this.personaList) {
      const postDialogRef = this.dialog.open(ModelDialogComponent, {
        data: this.personaDialog = {
          tipo: 'persona', accion: "registrar", model: this.personaID = {
            _id: null,
            nombre_completo: null,
            fecIngreso: null,
            fecNac: null,
            nombre: null,
            apellido: null,
          }
        }
      });
      postDialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.persona0 = result;
            console.log(this.persona0);
            console.log(result);
            this.personaService.savepersona(this.persona0)
              .subscribe(
                personaIData => {
                  this.dataSource.data.push(personaIData);
                  this.dataSource._updateChangeSubscription();
                },
                error => {
                  console.log('ERROR REGISTRAR ');
                  console.log(error as any);
                }
              );
              this.persona0 = null;
          }
        });
    }
  }

  updatePersona(personaUp: PersonaI) {
    console.log(personaUp);
    if (this.personaList) {
      const postDialogRef = this.dialog.open(ModelDialogComponent, {
        data: this.personaDialog = { tipo: 'persona', accion: "actualizar", model: personaUp }
      });
      postDialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.persona0 = result;
            this.personaService.updatepersona(this.persona0,personaUp._id)
            .subscribe(
              personaIData => {
                this.index = this.personaList.indexOf(personaUp)
                this.dataSource.data[this.index] = personaIData;
                this.dataSource._updateChangeSubscription();
              },
              error => {
                console.log('ERROR ACTUALIZA ');
                console.log(error as any);
              }
            );
          }
        });
    }
  }
  deletePersona(personaUp: PersonaI) {
    if (this.personaList) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: 'persona'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.personaService.deletepersona(personaUp._id)
            .subscribe(
              data => {
                this.index =  this.dataSource.data.indexOf(personaUp)
                this.dataSource.data.splice(this.index, 1)
                this.dataSource._updateChangeSubscription();
              },
              error => {
                console.log('ERROR DELETE');
                console.log(error as any);
              }
            );
        }
        console.log(result);
      });

    }
  }
}
