import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'system',
        pathMatch: 'full'
    },

    {path: 'system', loadChildren: './system/system.module#SystemModule'},
    {path: 'auth', loadChildren: './pages/auth/login/login.module#LoginPageModule'}

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
