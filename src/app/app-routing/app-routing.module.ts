import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'


import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { AboutComponent } from '../components/about/about.component';
import { UsersComponent } from '../components/users/users.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { PlaceholderComponent } from '../components/placeholder/placeholder.component';

const appRoutes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':userId', component: UserDetailsComponent },
      { path: '', component: PlaceholderComponent }
    ]
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
