import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};
