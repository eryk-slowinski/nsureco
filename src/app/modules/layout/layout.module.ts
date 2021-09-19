import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TopMenuComponent, FooterComponent],
  exports: [TopMenuComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class LayoutModule {}
