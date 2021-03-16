import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Authorities } from './core/models/authorities.enum';

import { HeaderComponent } from './shared/components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,

    children: [

      { path: '', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },

      { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },

      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { authorities: [Authorities.user] }, canActivate: [AuthGuard]
      },

      {
        path: 'managment',
        loadChildren: () => import('./managment/managment.module').then(m => m.ManagmentModule),
        data: { authorities: [Authorities.admin] }, canActivate: [AuthGuard]
      },

      { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },

      { path: 'page-not-found', loadChildren: () => import('./page-not-found/page-not-found-module').then(m => m.PageNotFoundModule) },

    ]
  },

  { path: '**', redirectTo: 'page-not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
