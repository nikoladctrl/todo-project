import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TodoEffects } from '../modules/todos/data/todo.effects';
import { NotificationEffects } from './store/effects/notification.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([NotificationEffects]),
    EffectsModule.forFeature([
      TodoEffects
    ]),
    HttpClientModule,
  ],
  exports: [
    BrowserAnimationsModule,
    StoreModule,
    StoreDevtoolsModule,
    EffectsModule,
    HttpClientModule,
  ]
})
export class CoreModule { }
