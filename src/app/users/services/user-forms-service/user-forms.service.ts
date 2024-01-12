import {inject, Injectable} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserFormsService {
  private readonly fb = inject(FormBuilder)

  public userFormCreate(user?: any) {
    return this.fb.group({
      id: [user?.id || new Date().getTime()],
      name: [user?.name || '', Validators.required],
      username: [user?.username || '', Validators.required],
      email: [user?.email || '', Validators.required],
      phone: [user?.phone || '', Validators.required],
    });
  }
}
