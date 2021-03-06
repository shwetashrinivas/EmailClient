import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

signedin$ :BehaviorSubject<boolean>;

constructor( private authService: AuthService){
  this.signedin$ = this.authService.signedin$;
}

/*
signedin =false;
ngOnInit(){
  this.authService.signedin$.subscribe(signedin => {
    this.signedin = signedin;
  });
}
*/

ngOnInit(){
  this.authService.checkAuth().subscribe( () => {});

  //For testing signout
  /*
  setTimeout(() => {
    this.authService.signout().subscribe(() => {});  
  },5000);
  */
 
}

}
