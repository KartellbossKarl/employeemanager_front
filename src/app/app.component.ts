import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({ //Decarator: gibt Metadaten an 
  selector: 'app-root', // Hauptkomponente 
  templateUrl: './app.component.html', //Der teil, den der User sieht 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  constructor() { }

  ngOnInit(): void {
  }
  
}









