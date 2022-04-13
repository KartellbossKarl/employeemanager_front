import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-details.component.html',
  styleUrls:['./employee-details.component.css' ] //für namen display: https://angular.io/guide/component-interaction
  
})
export class EmployeeDetailComponent implements OnInit {
  public editEmployee: Employee | undefined;
  public employees: Employee[] = [];//hier sind alle employees drin, wenn man getEmployees aufruft, also direkt beim Start der Seite

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({ //subscribed zu dem was vom server zurückkommt
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public onUpdateEmployee(employee: Employee): void {
    this.editEmployee = employee;
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
