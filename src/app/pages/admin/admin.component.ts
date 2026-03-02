import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Notification, Teacher, Review, GalleryItem, Vacancy } from '../../services/data.service';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';
import { AuditLogService } from '../../services/audit-log.service';

declare var cloudinary: any;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  notifications: Notification[] = [];
  faculty: Teacher[] = [];
  reviews: Review[] = [];
  gallery: GalleryItem[] = [];
  vacancies: Vacancy[] = [];
  pendingAttachmentUrl: string = '';
  pendingAttachmentType: 'image' | 'pdf' | null = null;
  pendingPublicId: string = '';

  constructor(
    private dataService: DataService, 
    private router: Router,
    private auditLog: AuditLogService
  ) {}

  ngOnInit() {
    this.dataService.getNotifications().subscribe(data => this.notifications = data);
    this.dataService.getTeachers().subscribe(data => this.faculty = data);
    this.dataService.getReviews().subscribe(data => this.reviews = data);
    this.dataService.getGallery().subscribe(data => this.gallery = data);
    this.dataService.getVacancies().subscribe(data => this.vacancies = data);
  }

  logout() {
    this.auditLog.logAction('LOGOUT', 'User logged out');
    signOut(auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  uploadMedia(type: 'image' | 'video') {
    const myWidget = cloudinary.createUploadWidget({
      cloudName: 'doaqxjjpt',
      uploadPreset: 'ml_default',
      sources: ['local', 'url', 'camera'],
      resourceType: type
    }, (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        const newItem: GalleryItem = {
          url: result.info.secure_url,
          publicId: result.info.public_id,
          type: type
        };
        this.dataService.addGalleryItem(newItem).subscribe(() => {
          this.auditLog.logAction('ADD_GALLERY', `Added ${type}: ${result.info.secure_url} (ID: ${result.info.public_id})`);
          alert(`${type === 'image' ? 'Photo' : 'Video'} added to gallery!`);
        });
      }
    });
    myWidget.open();
  }

    uploadAttachment(type: 'image' | 'pdf') {
      const isImage = type === 'image';
      const myWidget = cloudinary.createUploadWidget({
        cloudName: 'doaqxjjpt',
        uploadPreset: 'ml_default',
        sources: ['local', 'url', 'camera'],
        resourceType: 'auto', // Cloudinary will decide if it is 'image' or 'raw'
        clientAllowedFormats: isImage ? ['png', 'jpg', 'jpeg', 'webp'] : ['pdf']
      }, (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          this.pendingAttachmentUrl = result.info.secure_url;
          this.pendingAttachmentType = type;
          this.pendingPublicId = result.info.public_id;
          alert(`${type.toUpperCase()} uploaded successfully!`);
        }
      });
      myWidget.open();
    }
  
    addNotification(form: any) {
      if (form.valid) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        
        const newNotif: any = {
          title: form.value.title,
          content: form.value.content,
          date: `${dateStr} ${timeStr}`,
          timestamp: serverTimestamp()
        };
  
        if (this.pendingAttachmentUrl) {
          newNotif.attachmentUrl = this.pendingAttachmentUrl;
          newNotif.attachmentType = this.pendingAttachmentType;
          newNotif.publicId = this.pendingPublicId;
        }
        
        console.log('Attempting to add notification:', newNotif);
  
        this.dataService.addNotification(newNotif).subscribe({
          next: () => {
            this.auditLog.logAction('ADD_NOTIFICATION', `Added: ${newNotif.title}${this.pendingAttachmentUrl ? ` (with ${this.pendingAttachmentType}, ID: ${this.pendingPublicId})` : ''}`);
            alert('Notification posted!');
            form.reset();
            this.pendingAttachmentUrl = '';
            this.pendingAttachmentType = null;
            this.pendingPublicId = '';
          },
          error: (err) => {
            console.error('Error adding notification:', err);
            alert('Failed to post notification. Check console for details.');
          }
        });
      }
    }

  deleteNotification(id: string) {
    if (confirm('Delete this notification?')) {
      const notif = this.notifications.find(n => n.id === id);
      const pId = notif?.publicId;

      this.dataService.deleteNotification(id).subscribe(() => {
        this.auditLog.logAction('DELETE_NOTIFICATION', `Deleted notification ID: ${id} ${pId ? `(Cloudinary ID: ${pId})` : ''}`);
      });
    }
  }

  addTeacher(form: any) {
    if (form.valid) {
      this.dataService.addTeacher(form.value).subscribe(() => {
        this.auditLog.logAction('ADD_TEACHER', `Added: ${form.value.name}`);
        alert('Teacher added!');
        form.reset();
      });
    }
  }

  deleteTeacher(id: string) {
    if (confirm('Remove this teacher?')) {
      this.dataService.deleteTeacher(id).subscribe(() => {
        this.auditLog.logAction('DELETE_TEACHER', `Removed teacher ID: ${id}`);
      });
    }
  }

  approveReview(id: string) {
    this.dataService.approveReview(id).subscribe(() => {
      this.auditLog.logAction('APPROVE_REVIEW', `Approved review ID: ${id}`);
      alert('Review approved!');
    });
  }

  deleteReview(id: string) {
    if (confirm('Delete this review?')) {
      this.dataService.deleteReview(id).subscribe(() => {
        this.auditLog.logAction('DELETE_REVIEW', `Deleted review ID: ${id}`);
      });
    }
  }

  addVacancy(form: any) {
    if (form.valid) {
      const v: Vacancy = { 
        title: form.value.title, 
        description: form.value.description || '',
        count: form.value.count || 1,
        active: true 
      };
      this.dataService.addVacancy(v).subscribe(() => {
        this.auditLog.logAction('ADD_VACANCY', `Added: ${v.title}`);
        alert('Vacancy posted!');
        form.reset();
      });
    }
  }

  toggleVacancy(id: string, active: boolean) {
    this.dataService.toggleVacancy(id, active).subscribe(() => {
      this.auditLog.logAction('TOGGLE_VACANCY', `Set vacancy ${id} active: ${active}`);
    });
  }

  deleteVacancy(id: string) {
    if (confirm('Delete this vacancy?')) {
      this.dataService.deleteVacancy(id).subscribe(() => {
        this.auditLog.logAction('DELETE_VACANCY', `Deleted vacancy ID: ${id}`);
      });
    }
  }

  deleteGalleryItem(id: string) {
    if (confirm('Delete this media?')) {
      const item = this.gallery.find(g => g.id === id);
      const pId = item?.publicId;

      this.dataService.deleteGalleryItem(id).subscribe(() => {
        this.auditLog.logAction('DELETE_GALLERY', `Deleted media ID: ${id} ${pId ? `(Cloudinary ID: ${pId})` : ''}`);
      });
    }
  }
}
