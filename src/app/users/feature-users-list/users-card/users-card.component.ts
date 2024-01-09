import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUsersDialogComponent} from "../../feature-users-create/create-users-dialog/create-users-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UsersFacade} from "../../data-access/+state/users-facade";

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
  @Input() user!: UserApiInterface
  @Output() deleteClick: EventEmitter<UserApiInterface> = new EventEmitter<UserApiInterface>()

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)
  private readonly usersFacade = inject(UsersFacade)

  deleteUser() {
    if (this.user) {
      this.deleteClick.emit(this.user)
    }
  }

  openEditUserDialog(user: UserApiInterface): void {
    const dialogRef: MatDialogRef<CreateUsersDialogComponent> = this.dialog.open(CreateUsersDialogComponent, {
      data: {user, isEdit: true},
      width: '400px'
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.usersFacade.editUser(result);
        }
      });
  }
}
