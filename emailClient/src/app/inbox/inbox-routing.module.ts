import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InboxHomeComponent} from './inbox-home/inbox-home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';

const routes: Routes = [
  { path: '', 
    component : InboxHomeComponent,
    children: [
      {path: ':id' , component: EmailShowComponent, resolve: {email: EmailResolverService}},
      {path: '', component: PlaceholderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
