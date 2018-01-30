import { Component, OnInit } from '@angular/core';

import { Adal5Service } from 'adal-angular5';
import { adal } from 'adal-angular';


const config: adal.Config = {                           
  tenant: 'XXXXXX.onmicrosoft.com',                      
  clientId: 'XXXXXX-XXXXXXXX-XXXXXXXXX'    
}                                                       


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private service: Adal5Service) {      
    this.service.init(config);                      
  }    
  ngOnInit(){
    // Handle callback if this is a redirect from Azure
    this.service.handleWindowCallback();

    // Check if the user is authenticated. If not, call the login() method
    if (!this.service.userInfo.authenticated) {
      this.service.login();
    }

    // Log the user information to the console
    console.log('username ' + this.service.userInfo.username);

    console.log('authenticated: ' + this.service.userInfo.authenticated);

    console.log('name: ' + this.service.userInfo.profile.name);

    console.log('token: ' + this.service.userInfo.token);

    console.log(this.service.userInfo.profile);
  }

  // Logout Method
  public logout() {
    this.service.logOut();
  }
}
