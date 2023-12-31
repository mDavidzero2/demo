import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get<any>('http://localhost:9090/demo/getAll');
  }
  saveProduct(requestBody: any) {
    const url = 'http://localhost:9090/demo/save';
    return this.http.post(url, requestBody);
  }

}
