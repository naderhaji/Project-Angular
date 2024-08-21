import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ListSubscriptionComponent } from './subscription/list-subscription/list-subscription.component';
import { AddUpdateSubscriptionComponent } from './subscription/add-update-subscription/add-update-subscription.component';

const routes: Routes = [{
  path:'',
  component : SubscriptionComponent,
  children:[
    {
      path:'',
      component: ListSubscriptionComponent
    },
    {
      path:'subscription-management',
      component: AddUpdateSubscriptionComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
