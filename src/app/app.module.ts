import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule,MatTableModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatOption, MatOptionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmationComponent } from './components/dialog/confirmation/confirmation.component';
import { ModelDialogComponent } from './components/dialog/model-dialog/model-dialog.component';
import { HijoComponent } from './components/hijo/hijo.component';
import { PersonaComponent } from './components/persona/persona.component';
import { FooterComponent } from './components/estruct/footer/footer.component';
import { NavBarComponent } from './components/estruct/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    ModelDialogComponent,
    HijoComponent,
    PersonaComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    // material
    MatInputModule,
  //  MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [
    ModelDialogComponent,
    ConfirmationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
