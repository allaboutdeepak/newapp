import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupsProvider {
    
  apiUrl = "http://banbasa.com/expense_api/apis/";
   // apiUrl = "http://localhost/expense_api/apis/";
    getgroupmembers:any=null;
    currentgroupname:any=null;
    constructor(public http: Http,private events: Events) {
    }
    getmygroups(data, type){
        return new Promise((resolve, reject) =>{
          let headers = new Headers();
          this.http.post(this.apiUrl+type, JSON.stringify(data), {headers: headers}).
          subscribe(res =>{
            resolve(res.json());
          }, (err) =>{
            reject(err);
          });
    
        });
    
      }
      createNewGroup(data, type){
        return new Promise((resolve, reject) =>{
            let headers = new Headers();
            this.http.post(this.apiUrl+type, JSON.stringify(data), {headers: headers}).
            subscribe(res =>{
              resolve(res.json());
            }, (err) =>{
              reject(err);
            });
      
          });  
      }
}
