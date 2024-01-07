import {Component, inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe,} from "@angular/common";
import * as usersActions from '../../data-access/+state/users.actions';
import * as usersSelectors from '../../data-access/+state/users.selectors'
import {UsersCardComponent} from "../users-card/users-card.component";
import {UserApiInterface} from "../../interfaces/user-api-interface";

@Component({
  selector: 'app-feature-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UsersCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private readonly store: Store = inject(Store)
  users$ = this.store.select(usersSelectors.selectUsers);
  error$ = this.store.select(usersSelectors.selectUsersError);



  ngOnInit() {
    this.store.dispatch(usersActions.loadUsers())
  }

  deleteUser(user: UserApiInterface) {
    this.store.dispatch(usersActions.deleteUserSuccess({user}));
  }
}
