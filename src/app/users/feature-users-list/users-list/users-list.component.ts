import {Component, inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe,} from "@angular/common";
import * as usersSelectors from '../../data-access/+state/users.selectors'
import {UsersCardComponent} from "../users-card/users-card.component";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {UsersFacade} from "../../data-access/+state/users-facade";
import {MatButtonModule} from "@angular/material/button";
import {CreateUsersButtonComponent} from "../../feature-users-create/create-users-button/create-users-button.component";

@Component({
  selector: 'app-feature-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UsersCardComponent,
    MatButtonModule,
    CreateUsersButtonComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private readonly store: Store = inject(Store)
  private readonly usersFacade = inject(UsersFacade)

  users$ = this.store.select(usersSelectors.selectUsers);
  error$ = this.store.select(usersSelectors.selectUsersError);

  ngOnInit(): void {
    this.usersFacade.init()
  }

  deleteUser(user: UserApiInterface) {
    this.usersFacade.deleteUser(user)
  }

}
