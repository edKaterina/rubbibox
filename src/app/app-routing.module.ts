import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['/auth']);
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
        ...canActivate(redirectUnauthorizedToLogin)
    },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
