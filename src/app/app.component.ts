import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { auth } from './firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'school-website';
  showRouter = true;
  
  private timeoutId: any;
  private readonly TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  private isUserLoggedIn = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // destroy page
        this.showRouter = false;
        // recreate page
        setTimeout(() => {
          this.showRouter = true;
          // scroll top
          window.scrollTo(0, 0);
        }, 0);
      });
  }

  ngOnInit() {
    onAuthStateChanged(auth, (user) => {
      this.isUserLoggedIn = !!user;
      if (user) {
        this.resetTimer();
      } else {
        this.clearTimer();
      }
    });
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:touchstart')
  onUserActivity() {
    if (this.isUserLoggedIn) {
      this.resetTimer();
    }
  }

  private resetTimer() {
    this.clearTimer();
    this.timeoutId = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT_MS);
  }

  private clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private logout() {
    signOut(auth).then(() => {
      alert('You have been logged out due to inactivity.');
      this.router.navigate(['/login']);
    });
  }
}
