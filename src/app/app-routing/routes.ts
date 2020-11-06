import { Routes, CanActivate } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {FeedbackComponent} from '../feedback/feedback.component';
import {AuthGuardService as AuthGuard} from '../services/auth-guard.service';

export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'feedback', component: FeedbackComponent, canActivate:[AuthGuard] },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
