import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OracleLogService, LogEntry } from './oracle-log.service'; // ◄ ייבוא ה-LogEntry המתוקן

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errors: LogEntry[] = []; // ◄ מערך מסוג ה-Proto שלכם
  statusMessage = 'ממתין לפקודה...';
  statusClass = '';
  isLoaded = false;

  constructor(private logService: OracleLogService) {}

  ngOnInit() {
    this.loadErrors();
  }

  loadErrors() {
    this.statusMessage = 'טוען נתונים מהשרת... ⏳';
    this.statusClass = 'status-loading';
    
    this.logService.getCriticalErrors().subscribe({
        next: (response: any) => {
          // ◄ התיקון המדויק: חילוץ ישיר מתוך השדה שגילית ב-debugger!
          this.errors = response.errors || []; 
          
          this.isLoaded = true;
          this.statusMessage = `📊 נטענו ${this.errors.length} שורות לוג בהצלחה`;
          this.statusClass = 'status-success';
        },
        error: (err) => {
          console.error('כשל בשליפת נתונים באנגולר:', err);
          this.statusMessage = 'שגיאת תקשורת ❌';
          this.statusClass = 'status-error';
          this.errors = [];
        }
      });
  }
}
