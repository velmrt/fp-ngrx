import {UserApiInterface} from "../../interfaces/user-api-interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {UsersActions} from "./users.actions";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  users: UserApiInterface[]
  error: any
}

export const initialUsersState: UsersState = {
  users: [],
  error: null
}

export const usersFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialUsersState,
    on(UsersActions.loadUsersSuccess, (state, {users}) => ({...state, users})),
    on(UsersActions.loadUsersFailed, (state, {error}) => ({...state, error})),


    on(UsersActions.deleteUserSuccess, (state, {deletedUser}) => {
      const updatedUsers = state.users.filter((u) => u.id !== deletedUser.id);
      return {...state, users: updatedUsers};
    }),
    on(UsersActions.deleteUserFailed, (state, {error}) => ({...state, error})),


    on(UsersActions.addUserSuccess, (state, {addedUser}) => ({...state, users: [...state.users, addedUser]})),
    on(UsersActions.addUserFailed, (state, {error}) => ({...state, error})),


    on(UsersActions.editUserSuccess, (state, {editedUser}) => {
      const updatedUsers = state.users.map(user => user.id === editedUser.id ? {...user, ...editedUser} : user)
      return {...state, users: updatedUsers};
    }),
    on(UsersActions.editUserFailed, (state, {error}) => ({...state, error})),
  )
})

