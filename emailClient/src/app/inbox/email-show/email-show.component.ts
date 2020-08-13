import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { EmailService } from '../email.service';
// import { switchMap } from 'rxjs/operators';
import { Email} from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email ;

  constructor(
    private route: ActivatedRoute,
    // private emailService: EmailService
    ) { 
      this.email = this.route.snapshot.data.email;       //fall back to prevent error before rendering email

      this.route.data.subscribe(({email}) => {
        this.email = email;
      });
    }

  ngOnInit(): void {

    //console.log(this.route.snapshot.params.id);

    //Using Observable as we need id to change whenever we select another email
    /**
        this.route.params.subscribe( ({id}) => {
            this.emailService.getEmail(id).subscribe(email => {
              //This solution doesn't work if user starts toggling between emails and the response of previous updates and not the latest request.
              //Hence we use switchMap
          });
        });
     */

     /* Solution without EmailResolverService
     this.route.params.pipe(
       switchMap(({id}) => {
         return this.emailService.getEmail(id);
       })
     ).subscribe((email) => {
          this.email =email;
     });
    */
  }

}
