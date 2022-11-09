import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EMployeeformComponent implements OnInit {

  constructor(public empService: EmployeeService, public tost: ToastrService) { }
  @ViewChild('chk1') checkbox: ElementRef;  //ViewChild help us to access DOM element in backend file of can access child comp in Parent Comp.

  isSlide: string = 'off';

  ngOnInit(): void {
    this.empService.getDesignation().subscribe((res) => {
      this.empService.listDesig = res;
    })
  }
  submit(form: NgForm) {
    this.empService.employeeData.isMarried = form.value.isMarried == true ? 1 : 0;
    this.empService.employeeData.isActive = form.value.isActive == true ? 1 : 0;
    if (this.empService.employeeData.id == 0) {
      this.insertEmployee(form);
    } else {
      this.updateEmployee(form);
    }
  }

  insertEmployee(myForm: NgForm) {
    this.empService.saveEmployee().subscribe((res) => {
      this.resetForm(myForm);
      this.refreshData();
      this.tost.success('Success', 'Recored Saved.');
    })
  }

  updateEmployee(myForm: NgForm) {
    this.empService.updateEmp(myForm).subscribe((res) => {
      this.resetForm(myForm);
      this.refreshData();
      this.tost.warning('Updated', 'Recored update.');

    })
  }
  resetForm(myForm: NgForm) {
    myForm.form.reset(myForm.value);
    this.empService.employeeData = new Employee();
    this.hideShowSlide();
  }

  refreshData() {
    this.empService.getEmployee().subscribe((res) => {
      this.empService.listEmp = res;
    })
  }

  hideShowSlide() {
    if (this.checkbox.nativeElement.checked) {
      this.checkbox.nativeElement.checked = false;
      this.isSlide = 'off';
    } else {
      this.checkbox.nativeElement.checked = true;
      this.isSlide = 'on';
    }
  }
}
