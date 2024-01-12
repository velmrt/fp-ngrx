import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {UserFormsService} from "../services/user-forms-service/user-forms.service";
import {UsersFacade} from "../data-access/+state/users-facade";

@Component({
  selector: 'users-create-users-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditUserComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  private readonly userFormsService = inject(UserFormsService)
  private readonly usersFacade = inject(UsersFacade)
  public readonly data = inject(MAT_DIALOG_DATA)
  public userForms!: FormGroup
  @Input() isEdit!: boolean

  ngOnInit() {
    this.data
      ? this.userForms = this.userFormsService.userFormCreate(this.data)
      : this.userForms = this.userFormsService.userFormCreate()
  }

  public saveAction(): void {
    if (this.userForms.valid) {
      if (!this.isEdit) {
        this.usersFacade.addUser(this.userForms.value)
        this.dialogRef.close()
      } else {
        this.usersFacade.editUser(this.userForms.value)
        this.dialogRef.close(this.userForms.value)
      }
    }
  }
}

