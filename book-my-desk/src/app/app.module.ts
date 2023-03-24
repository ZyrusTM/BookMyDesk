import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './ui/components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { BookingComponent } from './booking-feature/components/booking/booking.component';
import { DeskComponent } from './booking-feature/components/desk/desk.component';
import { BookingCardComponent } from './booking-feature/components/booking-card/booking-card.component';
import { RoomComponent } from './booking-feature/components/room/room.component';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    DeskComponent,
    BookingCardComponent,
    RoomComponent,
  ],
  imports: [
    CommonModule,
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
    MatMenuModule,
    MatProgressBarModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
