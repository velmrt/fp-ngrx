import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import * as usersActions from './users.actions';
import {UsersApiService} from "../../http/users-api.service";
import {catchError, map, mergeMap, of} from "rxjs";

export const loadUsers$ = createEffect(
  (api = inject(UsersApiService), actions$ = inject(Actions)) => actions$.pipe(
    ofType(usersActions.loadUsers),
    mergeMap(() => api.getUsers()
      .pipe(
        map(users => usersActions.loadUsersSuccess({users})),
        catchError(error => of(usersActions.loadUsersFailure({error})))
      )
    )
  ), {functional: true}
)




