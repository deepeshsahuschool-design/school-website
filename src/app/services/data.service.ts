import { Injectable } from '@angular/core';
import { 
  collection, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { db } from '../firebase.config';
import { 
  collectionData as fsCollectionData 
} from 'rxfire/firestore';

export interface Notification {
  id?: string;
  title: string;
  content: string;
  date: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'pdf';
  publicId?: string;
  timestamp?: any;
}

export interface Teacher {
  id?: string;
  name: string;
  role: string;
  description: string;
}

export interface Review {
  id?: string;
  name: string;
  grade: string;
  rating: number;
  text: string;
  status: 'pending' | 'approved';
}

export interface GalleryItem {
  id?: string;
  url: string;
  publicId?: string;
  type: 'image' | 'video';
  timestamp?: any;
}

export interface Vacancy {
  id?: string;
  title: string;
  description: string;
  count: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  // --- Notifications ---
  getNotifications(): Observable<Notification[]> {
    const ref = collection(db, 'notifications');
    const q = query(ref, orderBy('timestamp', 'desc'));
    return fsCollectionData(q, { idField: 'id' }) as Observable<Notification[]>;
  }

  addNotification(notif: Notification) {
    const ref = collection(db, 'notifications');
    return from(addDoc(ref, notif));
  }

  deleteNotification(id: string) {
    const ref = doc(db, 'notifications', id);
    return from(deleteDoc(ref));
  }

  // --- Faculty ---
  getTeachers(): Observable<Teacher[]> {
    const ref = collection(db, 'faculty');
    return fsCollectionData(ref, { idField: 'id' }) as Observable<Teacher[]>;
  }

  addTeacher(teacher: Teacher) {
    const ref = collection(db, 'faculty');
    return from(addDoc(ref, teacher));
  }

  deleteTeacher(id: string) {
    const ref = doc(db, 'faculty', id);
    return from(deleteDoc(ref));
  }

  // --- Reviews ---
  getReviews(): Observable<Review[]> {
    const ref = collection(db, 'reviews');
    return fsCollectionData(ref, { idField: 'id' }) as Observable<Review[]>;
  }

  addReview(review: Review) {
    const ref = collection(db, 'reviews');
    return from(addDoc(ref, review));
  }

  approveReview(id: string) {
    const ref = doc(db, 'reviews', id);
    return from(updateDoc(ref, { status: 'approved' }));
  }

  deleteReview(id: string) {
    const ref = doc(db, 'reviews', id);
    return from(deleteDoc(ref));
  }

  // --- Gallery ---
  getGallery(): Observable<GalleryItem[]> {
    const ref = collection(db, 'gallery');
    return fsCollectionData(ref, { idField: 'id' }) as Observable<GalleryItem[]>;
  }

  addGalleryItem(item: GalleryItem) {
    const ref = collection(db, 'gallery');
    return from(addDoc(ref, item));
  }

  deleteGalleryItem(id: string) {
    const ref = doc(db, 'gallery', id);
    return from(deleteDoc(ref));
  }

  // --- Vacancies ---
  getVacancies(): Observable<Vacancy[]> {
    const ref = collection(db, 'vacancies');
    return fsCollectionData(ref, { idField: 'id' }) as Observable<Vacancy[]>;
  }

  addVacancy(vacancy: Vacancy) {
    const ref = collection(db, 'vacancies');
    return from(addDoc(ref, vacancy));
  }

  toggleVacancy(id: string, active: boolean) {
    const ref = doc(db, 'vacancies', id);
    return from(updateDoc(ref, { active }));
  }

  deleteVacancy(id: string) {
    const ref = doc(db, 'vacancies', id);
    return from(deleteDoc(ref));
  }
}
