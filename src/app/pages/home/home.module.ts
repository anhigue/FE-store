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
import { ProductComponent } from '../../components/product/product.component';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';
import { ProductVehicleDialogComponent } from '../../components/product-vehicle-dialog/product-vehicle-dialog.component';
import { ProductStockDialogComponent } from '../../components/product-stock-dialog/product-stock-dialog.component';
import { ProductService } from '../../services/product/product.service';
import { SaleComponent } from '../../components/sales/sales.component';
import { SalesDialogComponent } from '../../components/sales-dialog/sales-dialog.component';
import { SalesService } from '../../services/sales/sales.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SalesProductDialogComponent } from '../../components/sales-product-dialog/sales-product-dialog.component';
import { AdminBillComponent } from './admin-bill/admin-bill.component';
import { BillComponent } from '../../components/bill/bill.component';
import { BillService } from '../../services/bill/bill.service';

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
    ProductComponent,
    ProductDialogComponent,
    ProductVehicleDialogComponent,
    ProductStockDialogComponent,
    SaleComponent,
    SalesDialogComponent,
    SalesProductDialogComponent,
    AdminBillComponent,
    BillComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
  ],
  entryComponents: [
    DialogCustomComponent,
    VehicleComponent,
    SubsComponent,
    SubsDialogComponent,
    RolDialogComponent,
    ClientDialogComponent,
    ProductDialogComponent,
    ProductVehicleDialogComponent,
    ProductStockDialogComponent,
    SalesDialogComponent,
    SalesProductDialogComponent,
    BillComponent,
  ],
  providers: [
    VehicleService,
    UserService,
    DialogService,
    RolService,
    ProductService,
    SalesService,
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    BillService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
