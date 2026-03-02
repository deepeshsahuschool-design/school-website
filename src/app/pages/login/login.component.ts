import { Component, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { auth } from '../../firebase.config';
import { signInWithEmailAndPassword, setPersistence, inMemoryPersistence } from 'firebase/auth';
import { AuditLogService } from '../../services/audit-log.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  error: string = '';
  recaptchaToken: string = '';

  constructor(
    private router: Router, 
    private ngZone: NgZone,
    private auditLog: AuditLogService
  ) {}

  ngAfterViewInit() {
    this.renderReCaptcha();
  }

  renderReCaptcha() {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.render('recaptcha-container', {
        'sitekey': '6Lf-7XUsAAAAABQOh6lVJv0eWvRJUuP5CUiCAs2j',
        'callback': (token: string) => {
          this.ngZone.run(() => {
            this.recaptchaToken = token;
          });
        },
        'expired-callback': () => {
          this.ngZone.run(() => {
            this.recaptchaToken = '';
          });
        }
      });
    } else {
      setTimeout(() => this.renderReCaptcha(), 500);
    }
  }

  login(form: any) {
    if (form.invalid) return;

    if (!this.recaptchaToken) {
      this.error = 'Please complete the CAPTCHA.';
      return;
    }

    const { email, password } = form.value;
    
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(() => {
        this.auditLog.logAction('LOGIN_SUCCESS', `User logged in: ${email}`);
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        this.error = 'Invalid email or password. Please try again.';
        this.auditLog.logAction('LOGIN_FAILED', `Attempted email: ${email}`);
        console.error(err);
        // Reset recaptcha on failed login
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
          this.recaptchaToken = '';
        }
      });
  }
}
