import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HijoI } from 'src/app/model/hijo';
import { ModelDialog } from 'src/app/model/model-dialog';
import { HijoService } from 'src/app/service/hijo.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ModelDialogComponent } from '../dialog/model-dialog/model-dialog.component';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["fecNac", "fecIngreso", "nombre_completo", "actions"];
 
  hijoList: Array<HijoI>;

  hijoI: HijoI;
  hijoID: HijoI;
  hijo0: HijoI;
  hijoDialog: ModelDialog;
  public search;


  index: number;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private hijoService: HijoService,
    private rutaActiva: ActivatedRoute
  ) {

    // this.dataSource = new MatTableDataSource(this.getHijoI());
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  ngAfterViewInit() {
    this.search = this.rutaActiva.snapshot.params.hijosr;
    if(this.search){
      this.getHijoIfindID(this.search);
    }else{
    this.getHijoI();
  }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }
  getHijoIfindID(search): Array<HijoI> {
    this.hijoService.gethijoByIdPersona(search).subscribe(
      hijoData => {
 //       this.hijoList.push(hijoData);
        this.dataSource.data = hijoData;
    //    this.dataSource._updateChangeSubscription();
     
        // console.log(hijoData);
      },
      error => {
        console.log('ERROR ');
        console.log(error as any);
      });
      return this.hijoList;
  }

  

  getHijoI(): Array<HijoI> {
    this.hijoService.gethijos().subscribe(
      hijoData => {
        this.dataSource.data = hijoData;
        console.log()
        this.hijoList = hijoData;
        // console.log(hijoData);
      },
      error => {
        console.log('ERROR ');
        console.log(error as any);
      });
    return this.hijoList;
  }

  saveHijo() {
    if (this.hijoList) {
      const postDialogRef = this.dialog.open(ModelDialogComponent, {
        data: this.hijoDialog = {
          tipo: 'hijo', accion: "registrar", model: this.hijoID = {
            _id: null,
            idPersona: ' ',
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
            this.hijo0 = result;
            console.log(this.hijo0);
            console.log(result);
            this.hijoService.savehijo(this.hijo0)
              .subscribe(
                hijoIData => {
                  console.log(hijoIData);
                  this.dataSource.data.push(hijoIData);
                  this.dataSource._updateChangeSubscription();
                },
                error => {
                  console.log('ERROR REGISTRAR ');
                  console.log(error as any);
                }
              );
              this.hijo0 = null;
          }
        });
    }
  }

  updateHijo(hijoUp: HijoI) {
    console.log(hijoUp);
    if (this.hijoList) {
      const postDialogRef = this.dialog.open(ModelDialogComponent, {
        data: this.hijoDialog = { tipo: 'hijo', accion: "actualizar", model: hijoUp }
      });
      postDialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.hijo0 = result;
            this.hijoService.updatehijo(this.hijo0,hijoUp._id)
            .subscribe(
              uphijoIData => {
                this.index = this.hijoList.indexOf(hijoUp)
                this.dataSource.data[this.index] = uphijoIData;
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
  deleteHijo(hijoUp: HijoI) {
    if (this.hijoList) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: 'hijo'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.hijoService.deletehijo(hijoUp._id)
            .subscribe(
              data => {
                this.index =  this.dataSource.data.indexOf(hijoUp)
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