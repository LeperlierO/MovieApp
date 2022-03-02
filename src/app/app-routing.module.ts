import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: '', component: AlbumComponent},
  {path: 'genres/:genre', component: AlbumComponent},
  {path: 'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
