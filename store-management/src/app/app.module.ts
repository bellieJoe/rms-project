import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { TestMenuComponent } from './components/test-menu/test-menu.component';
import { ComponentsModule } from './components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { LyHammerGestureConfig, LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2, PartialThemeVariables } from '@alyle/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinimaLight, MinimaDeepDark, MinimaDark } from '@alyle/ui/themes/minima';
import { color } from '@alyle/ui/color';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


/**
 * For light theme
 * Theme name = minima-light
 */
export class CustomMinimaLight implements PartialThemeVariables {
  name = 'minima-light';
  primary = {
    default: color(0x2196f3),
    contrast: color(0xffffff)
  };
  accent = {
    default: color(0x69f0ae),
    contrast: color(0x202020)
  };
}

/**
 * For dark theme
 * Theme name = minima-dark
 */
export class CustomMinimaDark implements PartialThemeVariables {
  name = 'minima-dark';
  primary = {
    default: color(0x9c27b0),
    contrast: color(0xffffff)
  };
  accent = {
    default: color(0x69f0ae),
    contrast: color(0x202020)
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),LeafletModule, AppRoutingModule, ComponentsModule, BrowserAnimationsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }, 
    StyleRenderer, LyTheme2, 
    { provide: LY_THEME_NAME, useValue: 'minima-light' }, 
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, 
    { provide: LY_THEME, useClass: MinimaDeepDark, multi: true }, 
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    { provide: LY_THEME, useClass: CustomMinimaLight, multi: true }, // name minima-light
    { provide: LY_THEME, useClass: CustomMinimaDark, multi: true }, // name minima-dark
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
