import { Routes } from '@angular/router';

import { MenuPageComponent } from '../pages/menu-page/menu-page.component';
import { StoreManagerHomePageComponent } from '../pages/storemanager-home-page/storemanager-home-page.component';
import { NotfoundPageComponent } from '../pages/notfound-page/notfound-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'menu' },
    {
        path: 'menu',
        component: MenuPageComponent,
        children: [
            { path: 'home', component: StoreManagerHomePageComponent, data: { state: 'home' } },
            { path: '', redirectTo: '/menu/home', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotfoundPageComponent }
];