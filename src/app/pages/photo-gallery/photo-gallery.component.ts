import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-gallery',
  imports: [CommonModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.scss'
})
export class PhotoGalleryComponent {
  images: string[] = [
    'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771645944/image1_qynsey.jpg',
    'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771646223/istockphoto-2075602123-612x612_i0azkm.jpg'
  ];
  isLightboxOpen = false;
  currentImageIndex = 0;

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
