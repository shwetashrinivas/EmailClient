import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxHomeComponent } from './inbox-home/inbox-home.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailIndexComponent } from './email-index/email-index.component';
import { EmailReplyComponent } from './email-reply/email-reply.component';
import { EmailCreateComponent } from './email-create/email-create.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';


@NgModule({
  declarations: [InboxHomeComponent, EmailShowComponent, EmailIndexComponent, EmailReplyComponent, EmailCreateComponent, PlaceholderComponent],
  imports: [
    CommonModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
