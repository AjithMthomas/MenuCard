import { Component, Output,EventEmitter, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports : [MatSelectModule,CommonModule,FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit, OnDestroy {

  @Output() closeEvent = new EventEmitter<void>();

  private elementRef = inject(ElementRef)
  private waiterService = inject(WaiterServiceService);
  categories : any[]=[];

  categoryName : string ='';
  ngOnInit(){
    console.log('hello');
    this.waiterService.fetchCategories().subscribe((res)=>{
        this.categories = res.data
        console.log(res.data);
        
    });
    
  }

  showCategoryForm = false;

  close() {
    this.closeEvent.emit(); 
  }

  openCategoryForm(){
    this.showCategoryForm = !this.showCategoryForm;
    this.categoryName = '';
  }

  submitCategory(){
    if (this.categoryName.trim()) {
      this.waiterService.addCategory(this.categoryName).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.categoryName = '';
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
      console.log('destroyed');
      
  }


}
