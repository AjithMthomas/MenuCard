import { Component, Output,EventEmitter, ElementRef, inject, OnInit, OnDestroy, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [MatSelectModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit,OnDestroy{
  @Input() categoryId :number | undefined;
  @Input() type : 'add' | 'edit' = 'add';

  @Output() closeEvent = new EventEmitter<void>();

  private elementRef = inject(ElementRef)
  private fb = inject(FormBuilder)
  private waiterService = inject(WaiterServiceService);
  categories : any[]=[];

  categoryName : string ='';

  categoryForm : FormGroup = this.fb.group({
    categoryName: ['', Validators.required],
    categoryDescription: [''],
    categoryImage: [''],

  });


  ngOnInit(){
    this.waiterService.fetchCategories().subscribe((res)=>{
        this.categories = res.data
        console.log(res.data);
        
    });

    if (this.type === 'edit') {
      if (this.categoryId) {
        this.waiterService.fetchCategoryWithId(this.categoryId).subscribe((res) => {
          if(res && res.data){
            const categoryData = res.data; 
            
            this.categoryForm.patchValue({
              categoryName: categoryData.name,
              categoryDescription: categoryData.description
            });
          }
        });
      }
    }
    
  }


  close() {
    this.closeEvent.emit(); 
  }




  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.categoryForm.patchValue({
        categoryImage: file
      });
    }
  }
  



  submitCategory(): void {    
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('categoryName')?.value);
      formData.append('image', this.categoryForm.get('categoryImage')?.value); 
      formData.forEach((value,key) => {
        console.log(key+" "+value)
      });

      if (this.type === 'add') {
        this.waiterService.addCategoryFromModal(formData).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.categoryForm.reset();
            this.close();
          },
          (error) => {
            console.error('Error adding product:', error);
            // Handle error response
          }
        );
      }else if (this.type === 'edit' && this.categoryId) {
        // API call for editing an existing product
        this.waiterService.updateCategory(this.categoryId,formData).subscribe(
          (response) => {
            console.log('category updated successfully:', response);
            this.categoryForm.reset();
            this.close();
          },
          (error) => {
            console.error('Error updating product:', error);
            // Handle error response
          }
        );
      }

    } else {
      this.categoryForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
      console.log('destroyed');
      
  }


}
