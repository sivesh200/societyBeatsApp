import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule,TypeaheadModule,TabsModule   } from 'ngx-bootstrap';

@NgModule({
    imports: [
      CommonModule,
      ModalModule.forRoot(),
      TypeaheadModule.forRoot(),
      TabsModule.forRoot(),
    ],
    exports: [ModalModule,TypeaheadModule,TabsModule]
  })
  export class AppBootstrapModule {}