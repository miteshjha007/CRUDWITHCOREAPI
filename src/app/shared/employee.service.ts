import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation, Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myhttp: HttpClient) { }
  employeeURL: string = 'https://localhost:44326/api/TblEmployees';
  designationURL: string = 'https://localhost:44326/api/TblDesignations';
  listEmp: Employee[] = [];       //Putting Class refrence
  listDesig: Designation[] = [];

  employeeData: Employee = new Employee();  //for post data /Insert Data

  saveEmployee() {
    return this.myhttp.post(this.employeeURL, this.employeeData);
  }
  updateEmp(id: any) {
    return this.myhttp.put(`${this.employeeURL}/${this.employeeData.id}`, this.employeeData);
  }
  getEmployee(): Observable<Employee[]> {
    return this.myhttp.get<Employee[]>(this.employeeURL);
  }

  getDesignation(): Observable<Designation[]> {
    return this.myhttp.get<Designation[]>(this.designationURL);
  }

  deleteEmp(id: Number) {
    return this.myhttp.delete(`${this.employeeURL}/${id}`);
  }
}
