import { Routes } from '@angular/router';

// import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { MenuPageComponent } from '../pages/menu-page/menu-page.component';
import { FeedsPageComponent } from '../pages/feeds-page/feeds-page.component';
import { StoreManagerHomePageComponent } from '../pages/storemanager-home-page/storemanager-home-page.component';
import { StoreManagerStorePageComponent } from '../pages/storemanager-store-page/storemanager-store-page.component';
import { NotfoundPageComponent } from '../pages/notfound-page/notfound-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/menu/(home:home)' },
    // { path: 'login', component: LoginPageComponent },
    {
        path: 'menu',
        component: MenuPageComponent,
        // data: { state: 'menu' },
        children: [
            { path: 'home', outlet: 'home', component: StoreManagerHomePageComponent },
            { path: 'feeds', outlet: 'feeds', component: FeedsPageComponent },
            { path: 'mystore', outlet: 'mystore', component: StoreManagerStorePageComponent },
            { path: '', redirectTo: '/menu/(home:home)', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotfoundPageComponent }
];