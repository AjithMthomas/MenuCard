import { Component, ViewChild, inject } from '@angular/core';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { Router } from '@angular/router';
import { ICategory } from '../../repository/waiter-model';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../../../shared/components/alert-box/alert-box/alert-box.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../../shared/pipes/search-pipe/search.pipe";

@Component({
    selector: 'app-waiter-category',
    standalone: true,
    templateUrl: './waiter-category.component.html',
    styleUrl: './waiter-category.component.scss',
    imports: [MatSidenavModule, CategoryModalComponent, FormsModule, SearchPipe]
})
export class WaiterCategoryComponent {
  
  categories : ICategory[]=[]
  selectedCategoryId : number | undefined;
  addNewCategory : boolean = false;

  searchText:string = "";
  
  @ViewChild('editdrawer') editdrawer!: MatDrawer;
  @ViewChild('drawer') drawer!: MatDrawer;

  private router = inject(Router);
  private waiterService = inject(WaiterServiceService);
  private dialog = inject(MatDialog);
  
  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.waiterService.fetchCategories().subscribe((res)=>{
      this.categories = res.data
      
    })

  }

  navigateToHome(){
    this.router.navigate(['/captain/index'])
  }

  add(type?:string){
    if(type !== 'close'){
      this.addNewCategory = true
      setTimeout(()=>{
        this.drawer.toggle();
      },100)
    }else{
      this.addNewCategory = !this.addNewCategory
      this.drawer.toggle();
      this.fetchCategories();

    }

  }

  edit(id?:number) {
    if(id){
      this.selectedCategoryId = id
      setTimeout(()=>{
        this.editdrawer.toggle();
      },100)
    }else{
      this.editdrawer.toggle();
      this.selectedCategoryId = undefined
      this.fetchCategories();

    }
  }

  deleteProduct(categoryId:number){
    const dialogRef = this.dialog.open(AlertBoxComponent, {
      width: '350px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this category?',
        confirmText: 'Yes',
        cancelText: 'No',
        showCancel: true,
        type:"critical"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
      this.waiterService.deleteCategory(categoryId).subscribe((res) => {
        if(res.status_code === 400){
          const dialogRef = this.dialog.open(AlertBoxComponent, {
            width: '250px',
            data: {
              title: 'Info',
              message: res.message,
              confirmText: 'Ok',
              type:"info"

            }
          });
        }else{
          // Remove the deleted product from the local category array
          this.categories = this.categories.filter(category => category.id !== categoryId);
        }
        
      })
      }
    });
  }


}
