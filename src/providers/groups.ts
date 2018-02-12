import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GroupsProvider {
    getgroupmembers:any=null;
    currentgroupname:any=null;
    constructor(private http: HttpClient,
                private events: Events) {
    }
    
    getmygroups(){
        return [{groupName:'one',groupimage:'assets/user.jpg'},{groupName:'two',groupimage:'assets/user.jpg'}];
    }
    addmember(buddy){

    }
    getownership (currentgroupname){

    }
    currentgroup(){

    }
    

}
