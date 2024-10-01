import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/apiResponse.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getJobs() : Observable<Job[]>{
    return this.http.get<Job[]>('assets/data.json');
  }
}
