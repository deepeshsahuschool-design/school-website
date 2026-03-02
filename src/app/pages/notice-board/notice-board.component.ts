import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Notification } from '../../services/data.service';
import { SafeUrlPipe } from '../../services/safe-url.pipe';

@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './notice-board.component.html',
  styleUrl: './notice-board.component.scss'
})
export class NoticeBoardComponent implements OnInit {
  notifications: Notification[] = [];
  loading: boolean = true;
  selectedAttachment: { url: string, type: 'image' | 'pdf' } | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
        this.loading = false;
      }
    });
  }

  isNew(dateStr: string): boolean {
    if (!dateStr) return false;
    const noticeDate = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - noticeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }

  previewAttachment(url: string, type: any) {
    this.selectedAttachment = { url, type };
    document.body.style.overflow = 'hidden';
  }

  closePreview() {
    this.selectedAttachment = null;
    document.body.style.overflow = 'auto';
  }

  getDownloadUrl(url: string): string {
    if (!url) return '';
    if (url.includes('cloudinary.com')) {
      // Just add the attachment flag to force download
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  }
}
