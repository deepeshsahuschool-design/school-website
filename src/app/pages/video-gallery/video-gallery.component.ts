import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-gallery',
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss'
})
export class VideoGalleryComponent {
  videos: string[] = [
    'https://res.cloudinary.com/doaqxjjpt/video/upload/v1771645940/video1_xzjczf.mp4',
  ];
  isLightboxOpen = false;
  currentVideoIndex = 0;

  openLightbox(index: number): void {
    this.currentVideoIndex = index;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  nextVideo(): void {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
  }

  prevVideo(): void {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
  }
}
