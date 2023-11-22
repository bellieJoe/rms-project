import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaskitoModule } from '@maskito/angular';
import { ComponentsModule } from './components/components.module';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MaskitoModule, IonicModule.forRoot(), AppRoutingModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, TabsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
