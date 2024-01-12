import {inject, Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import * as usersSelectors from "./users.selectors";
import {UsersActions} from "./users.actions";

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  private readonly store: Store = inject(Store);
  public readonly users$ = this.store.select(usersSelectors.selectUsers);
  public readonly error$ = this.store.select(usersSelectors.selectUsersError);

  init() {
    this.store.dispatch(UsersActions.loadUsers())
  }

  deleteUser(deletedUser: UserApiInterface) {
    this.store.dispatch(UsersActions.deleteUserSuccess({deletedUser}))
  }

  addUser(addedUser: UserApiInterface) {
    this.store.dispatch(UsersActions.addUserSuccess({addedUser}))
  }

  editUser(editedUser: UserApiInterface) {
    this.store.dispatch(UsersActions.editUserSuccess({editedUser}))
  }
}
