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
        // this.roomkey = this.chatInfo.id;
        this.username = this.chatInfo.id;
        this.type = 'message';

        // console.log(this.chatInfo);
        console.log(this.roomkey, " ", this.username, " ", );

        firebase.database().ref('firebase-chat/'+this.roomkey+'/chats').on('value', resp => {
          this.chats = [];
          this.chats = snapshotToArray(resp);
        });

        firebase.database().ref('firebase-chat/'+this.username+'/chats').on('value', resp => {
          this.chats = this.chats.concat(snapshotToArray(resp));
          this.chats.sort((a, b) => (a.sendDate > b.sendDate ? 1 : -1))
          // this.allService.dismissLoading();
        });

      }
    )
  }
  sendMessage(){
    
    // console.log(this.roomkey, " ", this.type, " ", this.username, " ", this.message);
    let newData = firebase.database().ref('firebase-chat/'+this.roomkey+'/chats').push();
    // this.chats = [];
    const cDate = new Date();

    newData.set({
      type:this.type,
      username:this.username,
      message:this.message,
      sendDate:cDate.toUTCString()
    });
    this.message = '';

    // firebase.database().ref('firebase-chat/'+this.username+'/chats').on('value', resp => {
    //   this.chats = this.chats.concat(snapshotToArray(resp));
    //   this.chats.sort((a, b) => (a.sendDate > b.sendDate ? 1 : -1))
    // });
    // console.log(this.chats);
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
