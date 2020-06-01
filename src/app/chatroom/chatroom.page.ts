import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AllService } from '../all.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  chatInfo : any;
  roomkey = "";
  username = "";
  type = "";
  message = "";
  chats = [];
  temp = [];
  flag = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private allService: AllService
  ) { }

  ngOnInit() {
    // this.allService.showLoader();
    this.route.queryParams.subscribe(
      params => {
        this.chatInfo = this.router.getCurrentNavigation().extras.state.userInfo;
        this.roomkey = this.router.getCurrentNavigation().extras.state.currentId;
        this.username = this.chatInfo.id;
        this.type = 'message';
        
        firebase.database().ref('firebase-chat/'+this.roomkey+'/chats').orderByChild('username').equalTo(this.username).on('value', (resp) => {
          this.chats = [];
          this.chats = snapshotToArray(resp);
        })

        firebase.database().ref('firebase-chat/'+this.username+'/chats').orderByChild('username').equalTo(this.roomkey).on('value', (resp) => {
          // let temp = [];
          if(this.temp != []) {
            
        
        firebase.database().ref('firebase-chat/'+this.roomkey+'/chats').orderByChild('username').equalTo(this.username).on('value', (resp) => {
          this.chats = [];
          this.chats = snapshotToArray(resp);
          document.getElementById('your_div').scrollIntoView(false);
        })
          }
          this.temp = snapshotToArray(resp);
          this.chats = this.chats.concat(this.temp);
          this.chats.sort((a, b) => (a.sendDate > b.sendDate ? 1 : -1));
          console.log(this.temp);
          document.getElementById('your_div').scrollIntoView(false);
        })
      }
    )
  }
  sendMessage(){
    let newData = firebase.database().ref('firebase-chat/'+this.roomkey+'/chats').push();
    this.chats = [];
    const cDate = new Date();

    newData.set({
      type:this.type,
      username:this.username,
      message:this.message,
      sendDate:cDate.toUTCString()
    });
    this.message = '';
    this.chats = this.chats.concat(this.temp);
    this.chats.sort((a, b) => (a.sendDate > b.sendDate ? 1 : -1));
    document.getElementById('your_div').scrollIntoView(false);
    this.message = '';
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
