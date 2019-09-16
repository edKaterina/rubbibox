import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth.guard';


const routes: Routes = [

    {
        path: '',
        redirectTo: 'system',
        pathMatch: 'full'
    },

    {path: 'system', loadChildren: './system/system.module#SystemModule'},
    {path: 'auth', loadChildren: './pages/auth/login/login.module#LoginPageModule'},
    {
        path: 'chat/:id', loadChildren: './pages/messenger/chat/chat.module#ChatPageModule',
        canActivate: [AuthGuard]
    },  { path: 'offer-user', loadChildren: './pages/offer/offer-user/offer-user.module#OfferUserPageModule' }



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
