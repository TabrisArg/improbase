import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowGameComponent } from './components/show-game/show-game.component';
import { HomeComponent } from './components/home/home.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { EditGameResolver } from './components/edit-game/edit-game.resolver';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';




const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'new-game', component: NewGameComponent},
  { path: 'details/:id', component: EditGameComponent, resolve: {data: EditGameResolver} },
  { path: 'show/:id', component: ShowGameComponent, resolve: {data: EditGameResolver} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
