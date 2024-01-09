import {UserApiInterface} from "../../interfaces/user-api-interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import * as userActions from './users.actions'
import {LocalStorageService} from "../services/local-storage.service";

export const USERS_FEATURE_KEY = 'users';
const localStorageService = new LocalStorageService();

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
    on(userActions.loadUsersSuccess, (state, {users}) => {
      const newState = {...state, users};
      localStorageService.saveState(newState);
      return newState;
    }),
    on(userActions.loadUsersFailure, (state, {error}) => ({...state, error})),


    on(userActions.deleteUserSuccess, (state, {user}) => {
      const updatedUsers = state.users.filter((u) => u !== user);
      const newState = {...state, users: updatedUsers};
      localStorageService.saveState(newState);
      return newState;
    }),
    on(userActions.deleteUserFailure, (state, {error}) => ({...state, error})),


    on(userActions.addUserSuccess, (state, {user}) => {
      const newState = {...state, users: [...state.users, user]};
      localStorageService.saveState(newState);
      return newState;
    }),
    on(userActions.addUserFailure, (state, {error}) => ({...state, error})),


    on(userActions.editUserSuccess, (state, {user}) => {
      const updatedUsers = state.users.map(existingUser => {
        return existingUser.id === user.id ? { ...existingUser, ...user } : existingUser ;
      });
      const newState = {...state, users: updatedUsers};
      localStorageService.saveState(newState)
      console.log();
      return newState ;
    }),
    on(userActions.editUserFailure, (state, {error}) => ({...state, error})),
  )
})

