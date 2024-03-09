import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownComponent} from './shared/dropdown/dropdown.component';
import { FiltersDashboardComponent } from './filters-dashboard/filters-dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatGridListModule} from "@angular/material/grid-list";
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import { ModalComponent } from './modal/modal.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { CriteriaRowComponent } from './criteria-row/criteria-row.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    FiltersDashboardComponent,
    PageWrapperComponent,
    HeaderComponent,
    ModalComponent,
    ModalContentComponent,
    CriteriaRowComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatGridListModule,
        HttpClientModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
      MatNativeDateModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
