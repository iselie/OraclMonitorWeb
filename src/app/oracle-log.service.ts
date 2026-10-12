import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ◄ המבנה המדויק שלך מתוך קובץ ה-proto (באותיות קטנות בהתאמה לדפדפנים)
export interface LogEntry {
  Time: string;
  ID: string;
  Message: string;
  Level: string;
}

// התשובה שחוזרת מה-gRPC Service (רשימת הלוגים)
export interface LogListResponse {
  logs?: LogEntry[]; // ודא ששם המערך תואם ל-LogListResponse שלכם (למשל logs או entries)
}

@Injectable({
  providedIn: 'root'
})
export class OracleLogService {
  private apiUrl = 'http://localhost:50050/api/v1/oracle/critical-errors';

  constructor(private http: HttpClient) { }

  getCriticalErrors(): Observable<LogListResponse> {
    return this.http.get<LogListResponse>(this.apiUrl);
  }
}
