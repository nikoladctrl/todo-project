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
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule
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
    NbFormFieldModule,
    NbIconModule,
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
    NbFormFieldModule,
    NbIconModule,
  ]
})
export class NebularModule { }
