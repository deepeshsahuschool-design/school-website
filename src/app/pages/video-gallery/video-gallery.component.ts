import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-video-gallery',
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss'
})
export class VideoGalleryComponent implements OnInit {
  videos: string[] = [];
  isLightboxOpen = false;
  currentVideoIndex = 0;
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getGallery().subscribe(data => {
      this.videos = data.filter(item => item.type === 'video').map(item => item.url);
      this.isLoading = false;
    });
  }

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
