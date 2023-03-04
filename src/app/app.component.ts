import { Component} from '@angular/core';
import { AuthenticationService } from './core/service/authentication.service';

@Component({
  selector: 'org-fat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;
  title = "ims-app";
  
  constructor(private authenticationService: AuthenticationService) {
    this.isAuthenticated = this.authenticationService.isLoggedIn();
  }

  ngOnInit(){
    this.authenticationService.loginStatus.subscribe(status=>{
      this.isAuthenticated = status;
    });
  }  
}
