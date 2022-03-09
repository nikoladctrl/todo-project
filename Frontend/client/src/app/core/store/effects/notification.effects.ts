import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { AppState } from '..';



@Injectable()
export class NotificationEffects {

  // effectName$ = createEffect(() => {
  //   return this.actions$.pipe(
  //       ofType(FeatureActions.action),
  //       operator(() =>
  //         apiSource.pipe(
  //           map(data => FeatureActions.actionSuccess({ data })),
  //           catchError(error => of(FeatureActions.actionFailure({ error }))))
  //         ),
  //   );
  // });


  constructor(private actions$: Actions, private store: Store<AppState>) {}

}
