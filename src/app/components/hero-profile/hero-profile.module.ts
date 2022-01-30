import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiModule } from 'src/app/ui/shared-ui.module';
import { HeroProfileRoutingModule } from './hero-profile-routing.module';
import { HeroProfileComponent } from './hero-profile.component';

@NgModule({
    declarations: [
        HeroProfileComponent
    ],
    imports: [
        CommonModule,
        SharedUiModule,
        HeroProfileRoutingModule
    ]
})
export class HeroProfileModule { }