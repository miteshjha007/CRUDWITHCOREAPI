import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/employee.service';
import { EMployeeformComponent } from '../employeeform/employeeform.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService: EmployeeService, public datepipe: DatePipe, public tost: ToastrService) { }

  @ViewChild(EMployeeformComponent) emp: EMployeeformComponent; //accessing child comp in Parent Comp
  ngOnInit(): void {
    this.empService.getEmployee().subscribe((res) => {
      this.empService.listEmp = res;
    });
  }

  editEmp(emp: Employee) {
    emp.doj = this.datepipe.transform(emp.doj, 'yyyy-MM-dd');
    this.empService.employeeData = emp;
    if (this.emp.isSlide === 'off') {
      this.emp.hideShowSlide();
    }
  }

  deleteEmp(id: Number) {
    if (confirm('Are you want to delete?')) {
      this.empService.deleteEmp(id).subscribe(data => {
        console.warn('Record deleted.');
        this.empService.getEmployee().subscribe((res) => {
          this.empService.listEmp = res;
          this.tost.error('Deleted', 'Recored Deletd.');

        });
      }, errr => {
        console.warn('Not deleted.')
      });
    }
  }
}
