import { Component, Output,EventEmitter, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {

  @Output() closeEvent = new EventEmitter<void>();

  private elementRef = inject(ElementRef)

  close() {
    this.closeEvent.emit(); 
  }

  chooseProductImage() {
    const fileInput = this.elementRef.nativeElement.querySelector('#productImage');
    fileInput.click(); 
  }
}
