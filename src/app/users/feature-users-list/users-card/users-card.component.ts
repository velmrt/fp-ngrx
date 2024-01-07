import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {UserApiInterface} from "../../interfaces/user-api-interface";
import {MatButtonModule} from "@angular/material/button";

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

  deleteUser() {
    if (this.user) {
      this.deleteClick.emit(this.user)
    }
  }
}
