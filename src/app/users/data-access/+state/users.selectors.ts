import {createFeatureSelector, createSelector} from "@ngrx/store";
import {USERS_FEATURE_KEY, UsersState} from "./users.reducer";

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);
