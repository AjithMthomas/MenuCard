import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { CaptainDetail } from '../../repository/waiter-model';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  standalone:true,
  selector: 'app-captain-home',
  templateUrl: './captain-home.component.html',
  styleUrls: ['./captain-home.component.css']
})
export class CaptainHomeComponent implements OnInit {

  router = inject(Router)
  waiterService = inject(WaiterServiceService);
  http = inject(HttpClient);
  @ViewChild('drawer') drawer!: MatDrawer;

  captainDetails : CaptainDetail | undefined;
  imageUrl : string | undefined;
  addAdvertisement = false
  ngOnInit() {
    this.fetchDetails();
  }
    
  fetchDetails(){
    this.waiterService.fetchCaptainDetails().subscribe((res)=>{
      if(res){
        this.captainDetails = res.data
      }


    })
  }

  addAdv(type?:string){
      if(type !== 'close'){
        this.addAdvertisement = true
        setTimeout(()=>{
          this.drawer.toggle();
        },100)
      }else{
        this.addAdvertisement = !this.addAdvertisement
        this.drawer.toggle();  
      }
  
  }

  getQRBlob(){
    if (this.captainDetails?.qr_code) {
      this.http.get(this.captainDetails?.qr_code, { responseType: 'blob' }).subscribe(
        (response) => {          
          this.imageUrl = window.URL.createObjectURL(response);
          this.downloadQR()
        },
        (error) => {
          console.error('Error fetching QR image:', error);
        }
      );
    }
  }

  downloadQR() {
    if (this.captainDetails?.qr_code) {      
      const a = document.createElement('a');
      a.href = this.captainDetails?.qr_code;
      // a.download = `${this.captainDetails?.name}_qr_code.png`; 
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // window.URL.revokeObjectURL(this.imageUrl);
      a.setAttribute('download', `${this.captainDetails?.name}_qr_code.png`);

      if(typeof a.download === 'undefined'){
        window.open(this.captainDetails?.qr_code, '_blank')
      }else{
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/captain/captain-login'])
  }


  navigateToProducts(){
    this.router.navigate(['/captain/products'])
  }
  navigateToCategory(){    
    this.router.navigate(['/captain/category'])
  }
}
