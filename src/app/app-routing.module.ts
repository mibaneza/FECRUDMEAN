import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HijoComponent } from './components/hijo/hijo.component';
import { PersonaComponent } from './components/persona/persona.component';


const routes: Routes = [
  {
    path: 'Home/persona',
    component: PersonaComponent
  },
  {
    path: '',
    redirectTo: 'Home/persona',
    pathMatch: 'full'
  },
  {
    path: 'Home/hijos/:hijosr',
    component: HijoComponent
  },
  {
    path: 'Home/persona/:personar',
    component: PersonaComponent
  },
  {
    path: 'Home/hijos',
    component: HijoComponent
  },
  { path: '**', redirectTo: 'Home/persona', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true,enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
