import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-photo-gallery',
  imports: [CommonModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.scss'
})
export class PhotoGalleryComponent implements OnInit {
  images: string[] = [];
  isLightboxOpen = false;
  currentImageIndex = 0;
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getGallery().subscribe(data => {
      this.images = data.filter(item => item.type === 'image').map(item => item.url);
      this.isLoading = false;
    });
  }

  openLightbox(index: number): void {
    this.currentImageIndex = index;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
}
