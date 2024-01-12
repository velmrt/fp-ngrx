import {Injectable} from '@angular/core';
import {UserApiInterface} from "../../interfaces/user-api-interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveData(data: UserApiInterface[]): void {
    localStorage.setItem('usersData', JSON.stringify(data));
  }

  getData() {
    const data = localStorage.getItem('usersData');
    return data ? JSON.parse(data) : null;
  }
}
