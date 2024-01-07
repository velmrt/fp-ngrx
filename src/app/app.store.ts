import * as fromUsers from './users/data-access/+state/users.reducer';

export interface AppState {
  users: fromUsers.UsersState;
}

