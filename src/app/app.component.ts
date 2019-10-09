import { Component, OnInit } from '@angular/core';
import { AppComponentService } from './app.service';
import { Globals } from '../app/shared/constants/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
 
  userInfo :any;

  constructor(private appComponentService: AppComponentService, private globals: Globals)
 {}

  ngOnInit() {

    this.appComponentService.getUserData().subscribe(
      refData => {
        this.userInfo = refData;
        console.log('user details captured:',this.userInfo);

        this.globals.sso = this.userInfo.User["sso"];
        this.globals.firstName = this.userInfo.User["firstName"];
        this.globals.lastName = this.userInfo.User["lastName"];
        this.globals.role = this.userInfo.User["role"];
        this.globals.roleNM = this.userInfo.User["roleName"];

      },
      error => {
      });

  }
  title = 'gcb-ui';

  
}

