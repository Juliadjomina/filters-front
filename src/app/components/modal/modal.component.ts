import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { SelectorType } from '../../models/selector-type';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() formType: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    if (this.formType === 'modal') {
      const dialogRef = this.dialog.open(ModalContentComponent, {
        disableClose: false,
        width: '60%',
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
