import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { CatalogueCarsComponent } from './catalogue-cars/catalogue-cars.component';
import { InformationComponent } from './information/information.component';
import { SettingsComponent } from './settings/settings.component';
import { CatalogueUserComponent } from './catalogue-user/catalogue-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { CataloguePartsComponent } from './catalogue-parts/catalogue-parts.component';
import { SalesComponent } from './sales/sales.component';
import { DialogCustomComponent } from 'src/app/components/dialog-custom/dialog-custom.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { SubsComponent } from '../../components/subs/subs.component';
import { SubsDialogComponent } from '../../components/subs-dialog/subs-dialog.component';
import { RolComponent } from '../../components/rol/rol.component';
import { RolDialogComponent } from '../../components/rol-dialog/rol-dialog.component';
import { RolService } from '../../services/rol/rol.service';
import { ClientComponent } from '../../components/client/client.component';
import { ClientDialogComponent } from '../../components/client-dialog/client-dialog.component';

@NgModule({
  declarations: [
    CatalogueCarsComponent,
    InformationComponent,
    SettingsComponent,
    CatalogueUserComponent,
    CataloguePartsComponent,
    SalesComponent,
    DialogCustomComponent,
    VehicleComponent,
    SubsComponent,
    SubsDialogComponent,
    RolComponent,
    RolDialogComponent,
    ClientComponent,
    ClientDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    DialogCustomComponent,
    VehicleComponent,
    SubsComponent,
    SubsDialogComponent,
    RolDialogComponent,
    ClientDialogComponent,
  ],
  providers: [
    VehicleService,
    UserService,
    DialogService,
    RolService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
