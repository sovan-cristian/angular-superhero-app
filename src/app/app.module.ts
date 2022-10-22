import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { SuperpowersComponent } from './components/heroes/superpowers/superpowers.component';
import { HeroComponent } from './components/heroes/hero/hero.component';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from './services/server.service';
import { NgbdModalBasic } from './components/heroes/superpowers/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    SuperpowersComponent,
    HeroComponent,
    NgbdModalBasic,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
