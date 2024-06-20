import { Component, Output,EventEmitter, ElementRef, inject, OnInit, OnDestroy, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports : [MatSelectModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit, OnDestroy {

  @Input() productId :number | undefined;
  @Input() type : 'add' | 'edit' = 'add';

  @Output() closeEvent = new EventEmitter<void>();

  private elementRef = inject(ElementRef)
  private fb = inject(FormBuilder)
  private waiterService = inject(WaiterServiceService);
  categories : any[]=[];

  categoryName : string ='';

  productForm : FormGroup = this.fb.group({
    productName: ['', Validators.required],
    productPrice: ['', [Validators.required, Validators.min(0)]],
    productCategory: ['',Validators.required],
    productImage: [''],
    productStock: [true],

  });


  ngOnInit(){
    this.waiterService.fetchCategories().subscribe((res)=>{
        this.categories = res.data
        console.log(res.data);
        
    });

    if (this.type === 'edit') {
      if (this.productId) {
        this.waiterService.fetchProductWithId(this.productId).subscribe((res) => {
          if(res && res.data){
            const productData = res.data; 
            
            this.productForm.patchValue({
              productName: productData.name,
              productPrice: productData.price,
              productCategory: productData.category_id,
              productStock: productData.stock_available
            });
          }
        });
      }
    }
    
  }

  showCategoryForm = false;

  close() {
    this.closeEvent.emit(); 
  }

  openCategoryForm(){
    this.showCategoryForm = !this.showCategoryForm;
    this.categoryName = '';
  }


  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.productForm.patchValue({
        productImage: file
      });
    }
  }
  

  submitCategory(){
    if (this.categoryName.trim()) {
      this.waiterService.addCategory(this.categoryName).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.showCategoryForm = !this.showCategoryForm;
          this.categoryName = '';
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  submitProduct(): void {
    console.log('here');
    
    // console.log(this.productForm);
    
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('productName')?.value);
      formData.append('price', this.productForm.get('productPrice')?.value);
      formData.append('category_id', this.productForm.get('productCategory')?.value);
      formData.append('image', this.productForm.get('productImage')?.value); 
      formData.append('stock_available', this.productForm.get('productStock')?.value);
      formData.forEach((value,key) => {
        console.log(key+" "+value)
      });

      if (this.type === 'add') {
        this.waiterService.addProduct(formData).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.productForm.reset();
            this.close();
          },
          (error) => {
            console.error('Error adding product:', error);
            // Handle error response
          }
        );
      }else if (this.type === 'edit' && this.productId) {
        // API call for editing an existing product
        this.waiterService.updateProduct(this.productId,formData).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.productForm.reset();
            this.close();
          },
          (error) => {
            console.error('Error updating product:', error);
            // Handle error response
          }
        );
      }

    } else {
      this.productForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
      console.log('destroyed');
      
  }


}
