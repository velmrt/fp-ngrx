import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CreateUsersDialogComponent} from '../create-users-dialog/create-users-dialog.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UsersFacade} from "../../data-access/+state/users-facade";

@Component({
  selector: 'create-users-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-users-button.component.html',
  styleUrls: ['./create-users-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef)

  openAddUserDialog(): void {
    const dialogRef: MatDialogRef<CreateUsersDialogComponent> = this.dialog.open(CreateUsersDialogComponent, {
      data: {name: '', email: '', username: '', phone: '', isEdit: false},
      width: '400px'
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.usersFacade.addUser(result);
        }
      });
  }
}
