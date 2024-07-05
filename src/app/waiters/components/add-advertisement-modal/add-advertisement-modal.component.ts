import { NgStyle } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { IImageData, IupdatedmageData } from '../../repository/waiter-model';

@Component({
  standalone:true,
  selector: 'app-add-advertisement-modal',
  templateUrl: './add-advertisement-modal.component.html',
  styleUrls: ['./add-advertisement-modal.component.scss'],
  imports: [NgStyle]
})
export class AddAdvertisementModalComponent implements OnInit {

  advCount=3

  waiterService = inject(WaiterServiceService);

  ngOnInit() {
    initFlowbite();
    this.getAdvertisement();
  }

  getAdvertisement(){
    this.waiterService.getAdvertisement().subscribe({
      next : (res) => {
        if(res.data){
          this.updatedFiles = res.data
          console.log(this.updatedFiles);
          
        }
      }
    })
  }

  counter(i: number) {
    return new Array(i);
}


getImageUrl(index: number): string | null {
  const imageUrl = this.imageUrls[index];
  if (typeof imageUrl === 'string') {
    return imageUrl; // Return if it's already a string
  } else {
    return null; // Return null if it's not a string
  }
}

getUpdatedImageUrl(index: number): string | null {
  if (this.updatedFiles[index]?.image) {
    return this.updatedFiles[index].image; // Adjust this based on your data structure
  }
  return null;
}

updatedFiles : IupdatedmageData[] = [];

files: IImageData[]  = [];

imageUrls: (string | ArrayBuffer |null)[] = [];

onFileSelected(event: Event, index: number): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file instanceof File) {
        this.files[index] = { order: index + 1, image: file };
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls[index] = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Handle case where selected file is not an instance of File (optional)
        console.error('Selected file is not an instance of File.');
      }
    } 
  
    console.log(this.files);
}

submitFile(index:number){
  const item = this.files[index]
  if(item.order === index + 1 && item.image){
    const formData = new FormData();
    formData.append('position', item.order.toString()); // Ensure 'position' is appended correctly
    formData.append('image', item.image);
    this.waiterService.setAdvertisement(formData).subscribe({
      next : (res) =>{
        console.log(res);
        if(res.data){
          const data = res.data
          this.updatedFiles[index] = {id:data.id, position: data.position, image:data.image  }
        }
        
      }
    })
  }else{
    alert('noooo')
  }
} 

updateFile(index:number){
  console.log(this.files,'files');
  
  const item = this.files[index]
  console.log(item);
  console.log(index,'index');
  console.log(this.updatedFiles[index]?.position,'posss');
  
  
  if(item?.order === index + 1 && item?.image && item?.order === this.updatedFiles[index]?.position){
    const formData = new FormData();
    formData.append('position', item.order.toString()); // Ensure 'position' is appended correctly
    formData.append('image', item.image);
    const id = this.updatedFiles[index].id
    this.waiterService.updateAdvertisement(id,formData).subscribe({
      next : (res) => {
        console.log(res);
        if(res.data){
          const data = res.data
          this.updatedFiles[index] = { id:data.id,position: data.position, image:data.image  }
        }
        
      }
    })
  }else{
    alert('noooo')
    console.log('nooo');
    
  }
}



clearFile(index: number): void {
  this.files[index] = { order: index + 1, image: null };
  this.imageUrls[index] = null;
  // Optionally, you can reset the file input element
  const fileInput = document.getElementById(`dropzone-file-${index}`) as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
}





}
