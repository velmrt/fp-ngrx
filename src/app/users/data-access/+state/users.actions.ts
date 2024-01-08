import {createAction, props} from "@ngrx/store";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {AddUser} from "../../interfaces/add-user";

export const loadUsers = createAction('[Users API] Load Users')
export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ users: UserApiInterface[] }>())
export const loadUsersFailure = createAction('[Users API] Load Users Error', props<{ error: any }>())


export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ user: UserApiInterface }>());
export const deleteUserFailure = createAction('[User] Delete User Failed', props<{ error: any }>());


export const addUserSuccess = createAction('[User] Add User Success', props<{ user: any }>())
export const addUserFailure = createAction('[User] Add User Failed', props<{ error: any }>());


export const editUserSuccess = createAction('[User] Add User Failed', props<{ updatedUser: any }>());
export const editUserFailure = createAction('[User] Add User Failed', props<{ error: any }>());
