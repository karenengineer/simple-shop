import {Observable, of} from "rxjs";
import {Injectable} from '@angular/core';
import {User} from "../../shared/interfaces/user";
import {StorageKeys} from "../../shared/enums/storageKeys";
import {StorageService} from "../localstorage-service/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCredentials: User = {
    email: 'Zen@sayollo.com', password: '123456'
  }

  constructor(private readonly storageService: StorageService) {
  }

  public signIn(user: User): Observable<{ jwt: string }> {
    if (this.isAdmin(user)) {
      this.storageService.setItem(StorageKeys.JwtToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp')
      return of({jwt: this.storageService.getItem(StorageKeys.JwtToken)});
    }
    return of({jwt: ''})
  }

  private isAdmin(user: User): boolean {
    return JSON.stringify(user) === JSON.stringify(this.userCredentials)
  }

  private get getToken(): string {
    return this.storageService.getItem(StorageKeys.JwtToken);
  }

  public get isAuthenticated(): boolean {
    const token: string = this.getToken;
    return token.length > 0;
  }
}
