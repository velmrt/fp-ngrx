import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {UserApiInterface} from "../../interfaces/user-api-interface";

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
  templateUrl: './create-users-dialog.component.html',
  styleUrls: ['./create-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {
  public formGroup: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreateUsersDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserApiInterface
  ) {
    this.formGroup = this.formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      email: [data ? data.email : '', [Validators.required, Validators.email]],
      username: [data ? data.username : '', Validators.required],
      phone: [data ? data.phone : '', Validators.required]
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        name: this.formGroup.value.name,
        email: this.formGroup.value.email.trim().toLowerCase(),
        username: this.formGroup.value.username,
        phone: this.formGroup.value.phone
      }
      this.dialogRef.close(formData);
      console.log(formData)
    }
  }
}
