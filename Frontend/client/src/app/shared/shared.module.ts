import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NebularModule } from '../libraries/nebular/nebular.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    HeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    NgxPaginationModule,
  ],
  exports: [
    HeaderComponent,
    PaginationComponent,
    NebularModule,
    NgxPaginationModule,
  ]
})
export class SharedModule { }
