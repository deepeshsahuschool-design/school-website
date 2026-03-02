import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticeBoardComponent } from './pages/notice-board/notice-board.component';
import { AboutComponent } from './pages/about/about.component';
import { AcademicsComponent } from './pages/academics/academics.component';
import { AdmissionsComponent } from './pages/admissions/admissions.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PhotoGalleryComponent } from './pages/photo-gallery/photo-gallery.component';
import { VideoGalleryComponent } from './pages/video-gallery/video-gallery.component';
import { ParentsViewComponent } from './pages/parents-view/parents-view.component';
import { CareerOpportunityComponent } from './pages/career-opportunity/career-opportunity.component';
import { OurGoverningBodyComponent } from './pages/our-governing-body/our-governing-body.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'notice-board', component: NoticeBoardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'our-governing-body', component: OurGoverningBodyComponent },
  { path: 'academics', component: AcademicsComponent },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'photo-gallery', component: PhotoGalleryComponent },
  { path: 'video-gallery', component: VideoGalleryComponent },
  { path: 'parents-view', component: ParentsViewComponent },
  { path: 'career-opportunity', component: CareerOpportunityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];
