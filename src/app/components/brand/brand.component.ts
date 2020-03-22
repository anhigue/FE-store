import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BrandInterface } from '../../../interfaces/VehicleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../services/dialog/dialog.service';
import { BrandService } from '../../services/brand/brand.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'options'];
  brand: BrandInterface[] = [];
  dataSource: MatTableDataSource<BrandInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _BRAND_SERVICE: BrandService
  ) {}

  ngOnInit() {
    this.getBrand();
  }

  private getBrand(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      /* this._BRAND_SERVICE.readBrand().subscribe( (value: BrandInterface[]) => {
        if (value) {
          this.brand = value;
          this.dataSource = new MatTableDataSource<BrandInterface>(this.brand);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.brand.push({
        id: 1,
        name: 'Ford'
      });
      this.dataSource = new MatTableDataSource<BrandInterface>(this.brand);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de las marcas de los vehiculos.'
      );
    }
  }

  public wantCreate() {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(BrandDialogComponent)
        .beforeClosed()
        .subscribe((value: BrandInterface) => {
          if (value) {
            this.createBrand(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error al crear una marca de vehiculo.');
    }
  }

  private createBrand(brand: BrandInterface) {
    try {
      this._BRAND_SERVICE.newBrand(brand).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getBrand();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al crear una marca de vehiculo.'
      );
    }
  }

  wantUpdate(brand: BrandInterface) {
    try {
      this._DIALOG_SERVICE.shareData = brand;
      this._DIALOG_SERVICE
        .openDialog(BrandDialogComponent)
        .beforeClosed()
        .subscribe((value: BrandInterface) => {
          if (value) {
            this.updateBrand(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una marca de vehiculo.'
      );
    }
  }

  private updateBrand(brand: BrandInterface) {
    try {
      this._BRAND_SERVICE.updateBrand(brand).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getBrand();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una marca de vehiculo.'
      );
    }
  }

  wantDelete(brand: BrandInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar una marca de vehiculo',
        message: 'Estas seguro que quieres eliminar esta marca de vehiculo.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteBrand(brand);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una marca de vehiculo.'
      );
    }
  }

  private deleteBrand(brand: BrandInterface) {
    try {
      this._BRAND_SERVICE.deleteBrand(brand).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getBrand();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una marca de vehiculo.'
      );
    }
  }
}
