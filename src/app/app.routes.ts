import { Routes } from '@angular/router';
import { ChatComponent } from './feature-components/chat/chat.component';
import { DashboardComponent } from './feature-components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'chat',
 pathMatch:'full' 
   },
    {
        path: 'chat',
        loadComponent: () => import('./feature-components/chat/chat.component').then(c =>c.ChatComponent)
    },
    {
        path: 'dashboard',
               loadComponent: () => import('./feature-components/dashboard/dashboard.component').then(c =>c.DashboardComponent)

    },

    {
        path: '**',
               loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(c =>c.NotFoundPageComponent)

    }
];
