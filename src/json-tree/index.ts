import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonNodeComponent } from './json-node';
import { JsonTreeComponent } from './json-tree';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JsonNodeComponent,
    JsonTreeComponent
  ],
  exports: [
    JsonTreeComponent
  ]
})
export class JsonTreeModule { }