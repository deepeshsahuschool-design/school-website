import { Injectable } from '@angular/core';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase.config';

export interface AuditLog {
  action: string;
  details: string;
  userEmail: string | null;
  userId: string | null;
  ipAddress: string;
  userAgent: string;
  timestamp: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private ipAddress: string = 'unknown';

  constructor() {
    this.fetchIp();
  }

  private async fetchIp() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      this.ipAddress = data.ip;
    } catch (error) {
      console.error('Could not fetch IP:', error);
    }
  }

  async logAction(action: string, details: string) {
    const user = auth.currentUser;
    const log: AuditLog = {
      action,
      details,
      userEmail: user?.email || 'anonymous',
      userId: user?.uid || 'anonymous',
      ipAddress: this.ipAddress,
      userAgent: window.navigator.userAgent,
      timestamp: serverTimestamp()
    };

    try {
      const ref = collection(db, 'audit_logs');
      await addDoc(ref, log);
    } catch (error) {
      console.error('Error writing audit log:', error);
    }
  }
}
