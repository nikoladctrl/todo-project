import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NebularModule } from '../libraries/nebular/nebular.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    PaginationComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    NebularModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    PaginationComponent,
    NebularModule,
    SearchBarComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
