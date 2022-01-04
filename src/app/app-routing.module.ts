import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModule } from "./Core/core.module";
import { LoginComponent } from "./Core/Auth/login/login.component";
import { HomeComponent } from "./Core/home/home.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
    imports: [CoreModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}