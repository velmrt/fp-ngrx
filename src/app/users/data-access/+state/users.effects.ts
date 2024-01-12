import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {UsersApiService} from "../../services/http/users-api.service";
import {catchError, map, mergeMap, of, withLatestFrom} from "rxjs";
import {UsersActions} from "./users.actions";
import {LocalStorageService} from "../../services/local-storage-service/local-storage.service";
import {Store} from "@ngrx/store";
import {selectUsers} from "./users.selectors";

export const loadUsers$ = createEffect(
  (
    api = inject(UsersApiService),
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService),
    store = inject(Store)
  ) => actions$.pipe(
    ofType(UsersActions.loadUsers),
    withLatestFrom(store.select(selectUsers)),
    mergeMap(() => {
      const storedData = localStorageService.getData();
      return storedData && storedData.length > 0
        ? of(UsersActions.loadUsersSuccess({users: storedData}))
        : api.getUsers().pipe(
          map(dataFromBackend => {
            localStorageService.saveData(dataFromBackend);
            return UsersActions.loadUsersSuccess({users: dataFromBackend});
          }),
          catchError(error => of(UsersActions.loadUsersFailed({error})))
        );
    })
  ), {functional: true}
);

export const editUser$ = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
  localStorageService = inject(LocalStorageService)
) => actions$.pipe(
  ofType(UsersActions.addUserSuccess, UsersActions.editUserSuccess, UsersActions.deleteUserSuccess),
  withLatestFrom(store.select(selectUsers)),
  map(([action, userData]) => {
    localStorageService.saveData(userData);
  })
), {dispatch: false, functional: true});





