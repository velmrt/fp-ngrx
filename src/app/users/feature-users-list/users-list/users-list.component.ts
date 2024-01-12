import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe,} from "@angular/common";
import {UsersCardComponent} from "../users-card/users-card.component";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {UsersFacade} from "../../data-access/+state/users-facade";
import {MatButtonModule} from "@angular/material/button";
import {CreateEditUserComponent} from "../../create-users-dialog/create-edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-feature-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UsersCardComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private readonly usersFacade: UsersFacade = inject(UsersFacade)
  private readonly dialog = inject(MatDialog);
  public readonly users$ = this.usersFacade.users$
  public readonly error$ = this.usersFacade.error$

  ngOnInit(): void {
    this.usersFacade.init()
  }

  public deleteUser(user: UserApiInterface) {
    this.usersFacade.deleteUser(user)
  }

  public openAddUserDialog(isEdit: boolean) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '400px'
    })
    dialogRef.componentInstance.isEdit = isEdit
  }
}

