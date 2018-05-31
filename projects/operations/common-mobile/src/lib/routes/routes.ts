import { Routes } from '@angular/router';

import { AuthenticationGuard, CanDeactivateGuard, CurrentSessionResolver } from '@shared/data-core';

import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { MenuPageComponent } from '../pages/menu-page/menu-page.component';
import { FeedsPageComponent } from '../pages/feeds-page/feeds-page.component';
import { StoreManagerHomePageComponent } from '../pages/storemanager-home-page/storemanager-home-page.component';
import { StoreManagerStorePageComponent } from '../pages/storemanager-store-page/storemanager-store-page.component';
import { NotfoundPageComponent } from '../pages/notfound-page/notfound-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginPageComponent, data: { state: 'login' } },
    { path: 'login/:accessToken', component: LoginPageComponent, data: { state: 'login' } },
    {
        path: 'menu',
        canActivate: [AuthenticationGuard],
        component: MenuPageComponent,
        resolve: { currentSession: CurrentSessionResolver },
        data: { state: 'menu' },
        children: [
            { path: 'home', outlet: 'home', component: StoreManagerHomePageComponent, canActivate: [AuthenticationGuard], canDeactivate: [CanDeactivateGuard], data: { state: 'home' } },
            { path: 'feeds', outlet: 'feeds', component: FeedsPageComponent, canActivate: [AuthenticationGuard], canDeactivate: [CanDeactivateGuard], data: { state: 'feeds' } },
            { path: 'mystore', outlet: 'mystore', component: StoreManagerStorePageComponent, canActivate: [AuthenticationGuard], canDeactivate: [CanDeactivateGuard], data: { state: 'mystore' } },
            { path: '', redirectTo: '/menu/(home:home)', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotfoundPageComponent }
];