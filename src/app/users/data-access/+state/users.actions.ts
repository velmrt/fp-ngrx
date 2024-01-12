import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {UserApiInterface} from "../../interfaces/user-api-interface";

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'loadUsers': emptyProps(),
    'loadUsersSuccess': props<{ users: UserApiInterface[] }>(),
    'loadUsersFailed': props<{ error: any }>(),

    'deleteUserSuccess': props<{ deletedUser: UserApiInterface }>(),
    'deleteUserFailed': props<{ error: any }>(),

    'addUserSuccess': props<{ addedUser: UserApiInterface }>(),
    'addUserFailed': props<{ error: any }>(),

    'editUserSuccess': props<{ editedUser: UserApiInterface }>(),
    'editUserFailed': props<{ error: any }>()
  }
})





