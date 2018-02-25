import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { Http, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class TransactionsProvider {
    getgroupmembers:any=null;
    currentgroupname:any=null;
    //apiUrl = "http://localhost/expense_api/apis/";
    apiUrl = "http://banbasa.com/expense_api/apis/";
    constructor(public http: Http,
                private events: Events) {
    }
    
    

    addTransaction(credentials, type){

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

      userTransaction(credentials, type){

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
