import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalContentComponent} from "../modal-content/modal-content.component";
import {SelectorType} from "../_models/selector-type";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() criteriaTypes: SelectorType[] = [];
  @Input() comparisonOperators: SelectorType[] = [];
  @Input() showModal: string = '';

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    if (this.showModal === 'modal') {
      const dialogRef = this.dialog.open(ModalContentComponent, {
        disableClose: false,
        width: '60%',
        data: {criteriaTypes: this.criteriaTypes, comparisonOperator: this.comparisonOperators}
      });
      dialogRef.componentInstance.closeModal.subscribe(() => {
        dialogRef.close();
      });
    }
  }

  closeDialog() {
   this.dialog.closeAll();
  }
}
