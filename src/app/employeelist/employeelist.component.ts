import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";


@Component({ //Decarator: gibt Metadaten an 
  selector: 'employeelist ',  
  templateUrl: './employeelist.component.html', //Der teil, den der User sieht 
  styleUrls: ['./employeelist.component.css']
})
export class EmployeeComponent implements OnInit { 
  title = 'employeemanagerapp';
  public employees: Employee[] = [];//hier sind alle employees drin, wenn man getEmployees aufruft, also direkt beim Start der Seite
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
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

  public onOpenModal(mode: string, employee?: Employee): void { //same wie das createn in HTML 
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    } else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#editEmployeeModal');
    }

    container?.appendChild(button); //hinzufügen des Buttons
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click(); //Wofür war das da?
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
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

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
        //|| employee.id.indexOf(key) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public searchNameEmployee(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }

    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public searchNameandJobTitlesEmployees(key: string[]): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key[0].toLowerCase()) !== -1
        && employee.jobTitle.toLowerCase().indexOf(key[1].toLowerCase()) !== -1
        
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      alert("nix gefunden")
      this.getEmployees();

    }
  }

  public searchJobTitleEmployee(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (key === 'All')
    {
      this.getEmployees();
    }
    else if (results.length === 0 && key !== 'All') {
      alert("Keinen Eintrag gefunden")
    }
  }

  getValue(val: string) {
    console.warn(val);
  }
  getValue1(val: string) {

  }
}









