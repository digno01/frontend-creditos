import { Routes } from '@angular/router';
import { ConsultaCreditosComponent } from './components/consulta-creditos/consulta-creditos.component';

export const routes: Routes = [
  { path: '', component: ConsultaCreditosComponent },
  { path: 'consulta', component: ConsultaCreditosComponent },
  { path: '**', redirectTo: '' }
];
