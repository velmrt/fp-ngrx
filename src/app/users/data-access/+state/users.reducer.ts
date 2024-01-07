import {UserApiInterface} from "../../interfaces/user-api-interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import * as usersAction from './users.actions'

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
    on(usersAction.loadUsersSuccess, (state, {users}) => ({...state, users})),
    on(usersAction.loadUsersFailure, (state, {error}) => ({...state, error})),
    on(usersAction.deleteUserSuccess, (state, {user}) => ({
      ...state,
      users: state.users.filter(u => u !== user),
    })),
    on(usersAction.deleteUserFailed, (state, {error}) => ({...state, error})),
  ),
})

