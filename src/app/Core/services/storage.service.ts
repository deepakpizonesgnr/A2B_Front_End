import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private userSubject = new BehaviorSubject<any>(null);

    constructor() {
        let storedUser: any
        if (typeof localStorage !== 'undefined') {
            storedUser = localStorage.getItem('user');
        }
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    setUser(user: any) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
        this.userSubject.next(user);
    }

    clearUser() {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('user');
        }
        this.userSubject.next(null);
    }
}