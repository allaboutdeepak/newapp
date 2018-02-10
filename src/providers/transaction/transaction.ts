import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TransactionsProvider {
  firegroup = firebase.database().ref('/transactions');
  mytransactions: Array<any> = [];
  mygroups: Array<any> = [];
  currentgroup: Array<any> = [];
  currentgroupname;
  grouppic;
  groupmsgs;
  constructor(public events: Events) {

  }
  addTransaction(newTransaction) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(newTransaction.type).push({
        goods: newTransaction.goods,
        amount: newTransaction.amount,
        date: newTransaction.date,
        comment: newTransaction.comment,
        owner: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName,
        photoURL: firebase.auth().currentUser.photoURL,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        resolve(true);
        })/*.catch((err) => {
          reject(err);
      })*/
    });
    return promise;
  }

  getmytransactions() {
    this.firegroup.child(firebase.auth().currentUser.uid).child('personal').once('value', (snapshot) => {
     //console.log(snapshot.val());
      this.mytransactions = [];
      if(snapshot.val() != null) {
        var temp = snapshot.val();
        for (var key in temp) {
          var newtransactions = {
            id: key,
            goods:temp[key].goods,
            amount: temp[key].amount,
            date: temp[key].date,
            comment: temp[key].comment,
            owner: temp[key].owner,
            displayName: temp[key].displayName,
            photoURL: temp[key].photoURL,
          }
          this.mytransactions.push(newtransactions);
        }
      }
      this.events.publish('newtransaction');
    })
    
  }

  getintogroup(groupname) {
    if (groupname != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        if (snapshot.val() != null) {
          var temp = snapshot.val().members;
          this.currentgroup = [];
          for (var key in temp) {
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupname = groupname;
         this.events.publish('gotintogroup');
        }
      })
    }
  }

  getownership(groupname) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        var temp = snapshot.val().owner;
        if (temp == firebase.auth().currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
          reject(err);
      })
    })
    return promise;
  }

  getgroupimage() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        this.grouppic = snapshot.val().groupimage;
        resolve(true);
    })
    })
    
  }

  addmember(newmember) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').push(newmember).then(() => {
      this.getgroupimage().then(() => {
        this.firegroup.child(newmember.uid).child(this.currentgroupname).set({
          groupimage: this.grouppic,
          owner: firebase.auth().currentUser.uid,
          msgboard: ''
        }).catch((err) => {
          console.log(err);
        })
      })
      this.getintogroup(this.currentgroupname);
    })
  }

  deletemember(member) {           
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
      .child('members').orderByChild('uid').equalTo(member.uid).once('value', (snapshot) => {
        snapshot.ref.remove().then(() => {
          this.firegroup.child(member.uid).child(this.currentgroupname).remove().then(() => {
            this.getintogroup(this.currentgroupname);
          })
        })
      })
  }

  getgroupmembers() {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
      var tempdata = snapshot.val().owner;
      this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempvar = snapshot.val();
        for (var key in tempvar) {
          this.currentgroup.push(tempvar[key]);
        }
      })
    })
    this.events.publish('gotmembers');
  }

  leavegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
      var tempowner = snapshot.val().owner;
      this.firegroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('uid')
        .equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
          snapshot.ref.remove().then(() => {
            this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
              resolve(true);
            }).catch((err) => {
              reject(err);
            })
          }).catch((err) => {
            reject(err);
          })
      })
    })
    }) 
  }

  deletegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempmembers = snapshot.val();
  
        for (var key in tempmembers) {
          this.firegroup.child(tempmembers[key].uid).child(this.currentgroupname).remove();
        }

        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })
        
      })
    })
  }

  addgroupmsg(newmessage) {
    return new Promise((resolve) => {

    
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
      var tempowner = snapshot.val();
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('msgboard').push({
        sentby: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName,
        photoURL: firebase.auth().currentUser.photoURL,
        message: newmessage,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        if (tempowner != firebase.auth().currentUser.uid) {
          this.firegroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
            sentby: firebase.auth().currentUser.uid,
            displayName: firebase.auth().currentUser.displayName,
            photoURL: firebase.auth().currentUser.photoURL,
            message: newmessage,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
        }
        var tempmembers = [];
        this.firegroup.child(tempowner).child(this.currentgroupname).child('members').once('value', (snapshot) => {
          var tempmembersobj = snapshot.val();
          for (var key in tempmembersobj)
            tempmembers.push(tempmembersobj[key]);
        }).then(() => {
          let postedmsgs = tempmembers.map((item) => {
            if (item.uid != firebase.auth().currentUser.uid) {
              return new Promise((resolve) => {
                this.postmsgs(item, newmessage, resolve);
              })
            }
          })
          Promise.all(postedmsgs).then(() => {
            this.getgroupmsgs(this.currentgroupname);
            resolve(true);
          })
        })
      })
    })
    })  
  }

  postmsgs(member, msg, cb) {
    this.firegroup.child(member.uid).child(this.currentgroupname).child('msgboard').push({
            sentby: firebase.auth().currentUser.uid,
            displayName: firebase.auth().currentUser.displayName,
            photoURL: firebase.auth().currentUser.photoURL,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      cb();
    })
  }

  getgroupmsgs(groupname) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('msgboard').on('value', (snapshot) => {
      var tempmsgholder = snapshot.val();
      this.groupmsgs = [];
      for (var key in tempmsgholder)
        this.groupmsgs.push(tempmsgholder[key]);
      this.events.publish('newgroupmsg');
    })
  }

}