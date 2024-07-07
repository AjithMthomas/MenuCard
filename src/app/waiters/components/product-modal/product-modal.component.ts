import { Component, Output,EventEmitter, ElementRef, inject, OnInit, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPortionData } from '../../repository/waiter-model';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../../../shared/components/alert-box/alert-box/alert-box.component';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports : [MatSelectModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {

  @Input() productId :number | undefined;
  @Input() type : 'add' | 'edit' = 'add';

  @Output() closeEvent = new EventEmitter<void>();

  private elementRef = inject(ElementRef)
  private fb = inject(FormBuilder)
  private dialog = inject(MatDialog)
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

  portionForm : FormGroup = this.fb.group({
    fullPortion: ['', Validators.required],
    halfPortion: ['', Validators.required],
    quarterPortion: ['']
  });


  ngOnInit(){
    this.fetchCategories();

    if (this.type === 'edit') {
      if (this.productId) {
        this.waiterService.fetchProductWithId(this.productId).subscribe((res) => {
          if(res && res.data){
            const productData = res.data; 
            console.log(productData);
            
            
            this.productForm.patchValue({
              productName: productData.name,
              productPrice: productData.price,
              productCategory: productData.category_id,
              productStock: productData.stock_available
            });
            console.log(productData.portion,'portons');
            

            if(productData.portion && productData.product_portion.length){
              this.portionData = productData.product_portion.map((item : IPortionData) => ({
                ...item,
                editMode: false  // Adding editMode property with initial value false
              }));
              console.log(this.portionData);
              
              
              this.portionForm.patchValue({
                fullPortion: productData.product_portion.find((item: IPortionData) => item.name === 'Full')?.price || '', // Set fullPortion price
                halfPortion: productData.product_portion.find((item: IPortionData)  => item.name === 'Half')?.price || '', // Set halfPortion price
                quarterPortion: productData.product_portion.find((item: IPortionData)  => item.name === 'Quarter')?.price || '' // Set quarterPortion price if exists
              });
  
            }
          }
        });
      }
    }
    
  }

  enableEditMode(index: number) {
    this.portionData[index].editMode = true;
    this.portionData[index].priceEdit = this.portionData[index].price; 
  }
  
  saveChanges(index: number) {
    const newPrice = this.portionData[index].priceEdit;
    const name = this.portionData[index].name;
    const id = this.portionData[index].id;
    if(newPrice && id){
      const formData = {
        "price" : newPrice,
        "name":name
      }
      this.waiterService.editPortion(id,formData).subscribe((res)=>{
        if(res){
          console.log(res);
          
          this.portionData[index].price = newPrice;
          this.portionData[index].editMode = false;
        }
      })
     
    }
  }

  deletPortion(index:number){
    const id = this.portionData[index].id;
    if(this.portionData[index].name === 'Full'){
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '350px',
        data: {
          title: 'Info',
          message: 'Full  portion prices cannot be deleted.',
          confirmText: 'Ok',
          type:'info'
  
        }
      });
      return;
    }
    if(id){
      this.waiterService.deletePortion(id).subscribe({
        next: (res) =>{
          if(res.status_code === 204){
            this.portionData = []
          }else{
            this.portionData.splice(index, 1);
          }

        },
        error: (error) => {
          console.error('Error deleting portion', error);
        }
      })
    }
  }
  
  cancelEdit(index: number) {
    this.portionData[index].editMode = false;
  }
  

  fetchCategories(){
    this.waiterService.fetchCategories().subscribe((res)=>{
      this.categories = res.data
      
  });
  }

  showCategoryForm = false;
  showPortionForm = false;
  portionData : IPortionData[]=[]
  oldPortionData : IPortionData[]=[]
  isPortion = false;

  close() {
    this.closeEvent.emit(); 
  }

  openCategoryForm(){
    this.showCategoryForm = !this.showCategoryForm;
    this.categoryName = '';
  }

  openPortionForm(){
    this.showPortionForm = !this.showPortionForm;
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
          this.showCategoryForm = !this.showCategoryForm;
          this.categoryName = '';
          this.productForm.patchValue({
            productCategory: response.data.id,
          });
          this.fetchCategories();
        
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  submitPortion() {
    if (this.portionForm.valid) {
      const fullPortionPrice = this.portionForm.get('fullPortion')?.value;
      const halfPortionPrice = this.portionForm.get('halfPortion')?.value;
      const quarterPortionPrice = this.portionForm.get('quarterPortion')?.value;
      this.oldPortionData = this.portionData;
      this.portionData = [];

      this.portionData.push({
        name: 'Full',
        price: fullPortionPrice,
        stock_available: true 
      });

      this.portionData.push({
        name: 'Half',
        price: halfPortionPrice,
        stock_available: true 
      });
      if(quarterPortionPrice){
        this.portionData.push({
          name: 'Quarter',
          price: quarterPortionPrice,
          stock_available: true 
        });
      }
      this.isPortion = true;
      const productPriceControl = this.productForm.get('productPrice');
      productPriceControl?.clearValidators();
      productPriceControl?.updateValueAndValidity();
      this.openPortionForm();
      console.log(this.portionData);
  } else {
    const dialogRef = this.dialog.open(AlertBoxComponent, {
      width: '350px',
      data: {
        title: 'Info',
        message: 'Full and Half portion prices are required.',
        confirmText: 'Ok',
        type:'info'

      }
    });
  }
}


  submitProduct(): void {    
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('productName')?.value);
      formData.append('category_id', this.productForm.get('productCategory')?.value);
      formData.append('image', this.productForm.get('productImage')?.value); 
      formData.append('stock_available', this.productForm.get('productStock')?.value);
      if (this.portionData.length > 0) {
        const portionsArray = JSON.stringify(this.portionData);
        formData.append('portions', portionsArray);
        formData.append('portion', 'true');
        formData.append('price', this.portionForm.get('fullPortion')?.value);

      }else{
        formData.append('price', this.productForm.get('productPrice')?.value);
        formData.append('portion', 'false');
      }
      
      formData.forEach((value,key) => {
        console.log(key+" "+value)
      });

      if (this.type === 'add') {
        this.waiterService.addProduct(formData).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.productForm.reset();
            this.close();
            const dialogRef = this.dialog.open(AlertBoxComponent, {
              width: '350px',
              data: {
                title: 'Success',
                message: 'Product added succesfully',
                confirmText: 'Ok',
                type:'success'
        
              }
            });
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
            const dialogRef = this.dialog.open(AlertBoxComponent, {
              width: '350px',
              data: {
                title: 'Success',
                message: 'Product updated succesfully',
                confirmText: 'Ok',
                type:'success'
        
              }
            });
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





}
