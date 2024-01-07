import {createAction, props} from "@ngrx/store";
import {UserApiInterface} from "../../interfaces/user-api-interface";

export const loadUsers = createAction('[Users API] Load Users')
export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ users: UserApiInterface[] }>())
export const loadUsersFailure = createAction('[Users API] Load Users Error', props<{error: any}>())


export const deleteUser = createAction('[Users Page] Delete User');
export const deleteUserSuccess = createAction('[Users/Api] Delete User Success', props<{ user: UserApiInterface }>());
export const deleteUserFailed = createAction('[Users/Api] Delete User Failed', props<{ error: any }>());
