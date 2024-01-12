import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateEditUserComponent} from "../../create-users-dialog/create-edit-user.component";

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss'
})
export class UsersCardComponent {
  private readonly dialog = inject(MatDialog)
  @Input() user!: UserApiInterface
  @Output() deleteClick = new EventEmitter()

  public deleteUser() {
    this.deleteClick.emit(this.user)
  }

  public editUser(isEdit: boolean) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        id: this.user.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        phone: this.user.phone,
      },
      width: '400px'
    })
    dialogRef.componentInstance.isEdit = isEdit
  }
}
