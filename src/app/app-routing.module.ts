import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [

    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},

    {path: 'auth', loadChildren: './Tab_Setting/auth/auth.module#AuthPageModule'},

    // {path: 'auth', loadChildren: './pages/auth/auth/auth.module#AuthPageModule'},


    {
        path: 'chat/:id',
        children:
            [
                {
                    path: '',
                    loadChildren: './OtherPages/chat/chat.module#ChatPageModule'
                }
            ],
        canActivate: [AuthGuard]
    },

    {
      path: 'peopledetail/:id',
      children:
          [
            {
              path: '',
              loadChildren: './Tab_People/people-detail/people-detail.module#PeopleDetailPageModule'
            }
          ]
    },

    // {
    //     path: 'detail/:id',
    //     children:
    //         [
    //             {
    //                 path: '',
    //                 loadChildren: './OtherPages/detail/detail.module#DetailPageModule'
    //             }
    //         ],
    //     canActivate: [AuthGuard]
    // },

    {path: 'user-profile', loadChildren: './pages/user/user-profile/user-profile.module#UserProfilePageModule'},
    {path: 'offer-add-edit', loadChildren: './pages/offer/offer-add-edit/offer-add-edit.module#OfferAddEditPageModule'},
    {path: 'dialog-list', loadChildren: './pages/dialog/dialog-list/dialog-list.module#DialogListPageModule'},
   // {path: 'chat', loadChildren: './pages/dialog/chat/chat.module#ChatPageModule'},

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
