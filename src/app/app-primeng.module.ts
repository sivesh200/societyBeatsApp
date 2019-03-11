import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';


import {
  GrowlModule,
  CalendarModule,
  SplitButtonModule,
  CheckboxModule,
  RadioButtonModule,
  MultiSelectModule,
  DropdownModule,
  AutoCompleteModule,
  InputTextModule,
  ButtonModule,
  PasswordModule,
  KeyFilterModule,
  SidebarModule,
  MenuModule,
  TabViewModule,
  TooltipModule,
  TabMenuModule,
  AccordionModule,
  SlideMenuModule,
  InputTextareaModule,
  FileUploadModule,
  SpinnerModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule,
    RadioButtonModule,
    CheckboxModule,
    SplitButtonModule,
    CalendarModule,
    GrowlModule,
    PasswordModule,
    KeyFilterModule,
    SidebarModule,
    MenuModule,
    TabViewModule,
    TooltipModule,
    TableModule,
    TabMenuModule,
    AccordionModule,
    SlideMenuModule,
    InputTextareaModule,
    FileUploadModule,
    SpinnerModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule,
    RadioButtonModule,
    CheckboxModule,
    SplitButtonModule,
    CalendarModule,
    GrowlModule,
    PasswordModule,
    KeyFilterModule,
    SidebarModule,
    MenuModule,
    TabViewModule,
    TooltipModule,
    TableModule,
    TabMenuModule,
    AccordionModule,
    SlideMenuModule,
    InputTextareaModule,
    FileUploadModule,
    SpinnerModule
  ]
})
export class AppPrimeNGModule { }