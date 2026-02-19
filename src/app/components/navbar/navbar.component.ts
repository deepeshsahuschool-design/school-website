import { Component } from '@angular/core';
import { ExtraOptions, RouterLink, RouterLinkActive, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadComponent: () => import('../../pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('../../pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'academics', loadComponent: () => import('../../pages/academics/academics.component').then(m => m.AcademicsComponent) },
  { path: 'faculty', loadComponent: () => import('../../pages/faculty/faculty.component').then(m => m.FacultyComponent) },
  { path: 'contact', loadComponent: () => import('../../pages/contact/contact.component').then(m => m.ContactComponent) },
];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled'
};


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
