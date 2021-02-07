import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './redux/app';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormordenesPageModule } from './form/formordenes/formordenes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductosPageModule } from './pages/productos/productos.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
// import { Push } from '@ionic-native/push/ngx';
//import { FCM } from '@ionic-native/fcm/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    StoreModule.forRoot({ name: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppRoutingModule,
    HttpClientModule,
    FormordenesPageModule,
    ComponentsModule,
    ProductosPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    SocialSharing,
    LocalNotifications,
    // Push,
    // FCM,
    File,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
