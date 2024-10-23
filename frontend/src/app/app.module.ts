import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClaimsComponent } from './pages/claims/claims.component';
import { UsersComponent } from './pages/users/users.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { FinancialDashboardComponent } from './pages/financial-dashboard/financial-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
]);

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, SidebarComponent, ClientsComponent, ClaimsComponent, UsersComponent, MessagesComponent, FinancialDashboardComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
