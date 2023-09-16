import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MainModule } from './main/main.module';


const routes: Routes = [{
  path:'',loadChildren : ()=> import('./main/main.module').then(m=>m.MainModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
