import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
    state
    route
    const authService = inject(AuthService);

    // Simulate an async token check, you can replace this with an actual observable if necessary
    let token = authService.getToken();

    if (token) {
        return true;  // If the token is present, allow route access
    } else {
        // Add logic to display a loader or block the navigation until token retrieval is confirmed
        // router.navigateByUrl('/login');
        return false;
    }
};
