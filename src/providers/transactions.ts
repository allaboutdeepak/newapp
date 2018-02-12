import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TransactionsProvider {
    getgroupmembers:any=null;
    currentgroupname:any=null;
    constructor(private http: HttpClient,
                private events: Events) {
    }
    
    
    

}
