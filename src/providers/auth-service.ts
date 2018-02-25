import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  apiUrl = "http://banbasa.com/expense_api/apis/";
  //apiUrl = "http://localhost/expense_api/apis/";
  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(this.apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
  sendotp(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(this.apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
  verifyotp(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(this.apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
}
