import { inject, Injectable} from '@angular/core';
import {API_URL} from "./api-url.token";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserApiInterface} from "../interfaces/user-api-interface";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly apiUrl: string = inject(API_URL)
  private readonly http: HttpClient = inject(HttpClient)

  public getUsers(): Observable<UserApiInterface[]> {
    return this.http.get<UserApiInterface[]>(this.apiUrl);
  }
}
