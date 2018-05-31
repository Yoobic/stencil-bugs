import { Routes } from '@angular/router';

import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { MenuPageComponent } from '../pages/menu-page/menu-page.component';
import { FeedsPageComponent } from '../pages/feeds-page/feeds-page.component';
import { StoreManagerHomePageComponent } from '../pages/storemanager-home-page/storemanager-home-page.component';
import { StoreManagerStorePageComponent } from '../pages/storemanager-store-page/storemanager-store-page.component';
import { NotfoundPageComponent } from '../pages/notfound-page/notfound-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginPageComponent },
    {
        path: 'menu',
        component: MenuPageComponent,
        children: [
            { path: 'home', component: StoreManagerHomePageComponent, data: { state: 'home' } },
            { path: 'feeds', component: FeedsPageComponent, data: { state: 'feeds' } },
            { path: 'mystore', component: StoreManagerStorePageComponent, data: { state: 'mystore' } },
            { path: '', redirectTo: '/menu/home', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotfoundPageComponent }
];