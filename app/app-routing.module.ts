import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [TutorialGuard] 
  },
  {
    path: 'tutorial',
    loadChildren: './tutorial/tutorial.module#TutorialPageModule'
  },

  { path: 'profile-edit',
    loadChildren: './profile-edit/profile-edit.module#ProfileEditPageModule' },

  { path: 'Property', 
  loadChildren: './Property/Property.module#PropertyPageModule',
  canActivate: [AuthGuard] },
  
  
  
  { path: 'UserFeed', loadChildren: './user-feed/user-feed.module#UserFeedPageModule' },
  { path: 'Login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'Registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule' },
  { path: 'CreateProfile', loadChildren: './pages/create-profile/create-profile.module#CreateProfilePageModule' },
  { path: 'Preferences', loadChildren: './pages/preferences/preferences.module#PreferencesPageModule' },
  { path: 'Landlord', loadChildren: './pages/landlord/landlord.module#LandlordPageModule' },
  { path: 'AboutMe', loadChildren: './pages/about-me/about-me.module#AboutMePageModule' }

]
@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
