import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'system',
        pathMatch: 'full'
    },

    {   path: 'system', loadChildren: './system/system.module#SystemModule'},
    {   path: 'auth', loadChildren: './Tab_Setting/auth/auth.module#AuthPageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
