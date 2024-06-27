import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [MatDialogClose,MatDialogActions,MatDialogContent],
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.scss'
})
export class AlertBoxComponent {
  public dialogRef = inject(MatDialogRef<AlertBoxComponent>);
  public data : any = inject(MAT_DIALOG_DATA)

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
