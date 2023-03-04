import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridComponent } from './component/grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HumanizePipe } from './CustomPipes/HumanizePipe.pipe';
import { InactivateAlert } from './commonalerts/inactivatealert';
import { SaveAlert } from './commonalerts/savealert';



@NgModule({
  declarations: [GridComponent, HumanizePipe],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
    
  ],
  exports:[
    CommonModule,
    RouterModule,
    GridComponent,
    HumanizePipe
  ],
  providers:[InactivateAlert, SaveAlert,DatePipe]
})
export class SharedModule { }
