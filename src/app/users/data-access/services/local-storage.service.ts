
import { Injectable } from '@angular/core';
import {UsersState} from "../+state/users.reducer";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'userAppState';

  saveState(state: UsersState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  loadState(): UsersState | null {
    const storedState = localStorage.getItem(this.storageKey);
    return storedState ? JSON.parse(storedState) : null;
  }
}
