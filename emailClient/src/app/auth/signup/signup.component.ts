import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm =  new FormGroup( {
    // defaultvalue '', [sync validators] , [async validators]
    username: new FormControl('' , [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ] ,
    [
      this.uniqueUsername.validate
    ]
    ),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
    
  },
  {
    validators: [this.matchpwd.validate]
  });


  constructor(
      private matchpwd: MatchPassword , 
      private uniqueUsername: UniqueUsername,
      private authService: AuthService,
      private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if ( this.authForm.invalid){
      return;
    }

    this.authService.signUp(this.authForm.value)
      .subscribe({
        next : response => {
        //Navigate to some other route
        this.router.navigateByUrl('/inbox');

      },
      //complete(){},
      error: (err) => {
        if( !err.status) {
          this.authForm.setErrors({ noConnection: true });
        }
        else
        {
          this.authForm.setErrors({ unknownError: true }); 
        }
      }      
    });
  }
}
