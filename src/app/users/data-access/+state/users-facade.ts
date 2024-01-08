import {inject, Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import * as UsersActions from './users.actions';
import {LocalStorageService} from "../services/local-storage.service";
import {UsersState} from "./users.reducer";
import * as usersActions from "./users.actions";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {AddUser} from "../../interfaces/add-user";

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  private readonly store: Store = inject(Store);
  private readonly localStorageService:LocalStorageService = inject(LocalStorageService)

  init() {
    const storedState: UsersState | null = this.localStorageService.loadState();
    if (storedState && storedState.users.length) {
      this.store.dispatch(usersActions.loadUsersSuccess({ users: storedState.users }));
    } else {
      this.store.dispatch(usersActions.loadUsers());
    }
  }

  deleteUser(user: UserApiInterface) {
    this.store.dispatch(UsersActions.deleteUserSuccess({ user }))
  }

  addUser(user: AddUser) {
    this.store.dispatch(UsersActions.addUserSuccess({ user }))
  }

}
