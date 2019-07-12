import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {TerminListeComponent} from './views/termin-liste/termin-liste.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'termin-list', component: TerminListeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
