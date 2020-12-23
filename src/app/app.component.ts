import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public data: any = {};
  dataMenu: any = {
    menu1: [],
    menu2: [],
    menu3: []
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private LocalNotifications: LocalNotifications,
    // private fcm: FCM,
    // private push: Push
  ) {
    this.initializeApp();
    try {
      this.getToken();
    } catch (error) {}
  }

  ngOnInit() {
    // this.hasPermission();
    // get FCM token
    // this.fcm.getToken().then(token => {
    //   console.log(token);
    // });
  }

  getToken() {
    // this.fcm.getToken().then(token => {
    //   console.log("1111111111112222222222222222233333333333333",token);
    //   // Register your new token in your back-end if you want
    //   // backend.registerToken(token);
    // });
  }

  /*hasPermission() {
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          this.push.createChannel({
            id: "testchannel1",
            description: "My first test channel",
            // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
            importance: 3,
            //badge is used to if badge appears on the app icon see https://developer.android.com/reference/android/app/NotificationChannel.html#setShowBadge(boolean).
            //false = no badge on app icon.
            //true = badge on app icon
            badge: false
          }).then(() => console.log('Channel created'));

          // Delete a channel (Android O and above)
          this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

          // Return a list of currently configured channels
          this.push.listChannels().then((channels) => console.log('List of channels', channels))

          // to initialize push notifications

          const options: PushOptions = {
            android: {},
            ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
            },
            windows: {},
            browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
          }

          const pushObject: PushObject = this.push.init(options);


          pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

          pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
  }*/

  _localNotifications() {
    this.LocalNotifications.schedule({
      title: 'Hola Prueba',
      text: "Men Como vamos",
      icon: "https://google.com.co"
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.dataService.getMenuOpts().subscribe(rta=>{this.dataMenu=rta.data; console.log(rta) });
    });
  }
}
