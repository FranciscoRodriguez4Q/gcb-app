import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/prime';
import { FileDownloadModule } from 'src/app/layout/file-download/file-download.module';
import { NgbModule,NgbCarouselModule, NgbAlertModule,NgbDropdownModule,NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '../layout.module';
import {DropdownModule} from 'primeng/dropdown';
import {FileDownloadComponent} from '../file-download/file-download.component';
import { ServiceTypeComponent } from './service-type.component';
import { ServiceTypeRoutingModule } from './service-type-routing.module';
/* import {EsbDatamartModifyComponent} from './esb-detail-modify.component';
 */ 
 
 
@NgModule({
  declarations: [ServiceTypeComponent],
  imports: [ 
    CommonModule,FormsModule,
    ServiceTypeRoutingModule,
    CommonModule,
    FormsModule,  PrimeModule,
    ReactiveFormsModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
   LayoutModule,
    NgbModalModule.forRoot(),
 
 //   DashboardModule,
    DropdownModule
  ]
})
export class ServiceTypeModule { }