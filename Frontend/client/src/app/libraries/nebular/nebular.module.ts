import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { 
  NbThemeModule, 
  NbLayoutModule, 
  NbInputModule, 
  NbCardModule,
  NbStepperModule, 
  NbButtonModule, 
  NbButtonGroupModule,
  NbAccordionModule,
  NbCheckboxModule
} from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbCardModule,
    NbStepperModule,
    NbButtonGroupModule,
    NbAccordionModule,
    NbCheckboxModule,
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbAccordionModule,
    NbButtonModule,
    NbCheckboxModule,
  ]
})
export class NebularModule { }
