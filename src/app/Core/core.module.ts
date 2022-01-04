import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./Auth/login/login.component";
import { SharedModule } from "../Shared/shared.module";
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [HeaderComponent, LoginComponent, HomeComponent],
    imports: [SharedModule],
    exports: [HeaderComponent, LoginComponent]
})
export class CoreModule {

}