import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { BookingComponent } from './booking/booking.component';
import { DeskComponent } from './desk/desk.component';
import { BookingCardComponent } from './booking-card/booking-card.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    DeskComponent,
    BookingCardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      // {path: 'home', component: HomeComponent},
      {path: 'booking', component: BookingComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      // {path: '**', component: PageNotFoundComponent}
    ]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }