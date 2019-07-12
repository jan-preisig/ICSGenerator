import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {CachingInterceptor} from './cache/caching-interceptor.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TerminComponent} from './components/termin/termin.component';
import {HomeComponent} from './views/home/home.component';
import {ToastrModule} from 'ngx-toastr';
import {TerminListeComponent} from './views/termin-liste/termin-liste.component';


@NgModule({
  declarations: [
    AppComponent,
    TerminComponent,
    HomeComponent,
    TerminListeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
