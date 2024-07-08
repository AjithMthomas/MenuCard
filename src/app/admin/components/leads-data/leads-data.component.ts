import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../../../shared/components/alert-box/alert-box/alert-box.component';

@Component({
  selector: 'app-leads-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leads-data.component.html',
  styleUrl: './leads-data.component.scss'
})
export class LeadsDataComponent {
  private fb = inject(FormBuilder)
  adminService = inject(AdminService);
  dialog = inject(MatDialog);

  leadsForm : FormGroup = this.fb.group({
    name: ['', Validators.required],
    place: ['', Validators.required],
    contact: ['',Validators.required],
    franchiseCount: [''],
    price: ['',Validators.required],
  });

  submitForm(){
    if(this.leadsForm.valid){
      const formData = {
        name: this.leadsForm.get('name')?.value,
        place: this.leadsForm.get('place')?.value,
        contact: String(this.leadsForm.get('contact')?.value), // Convert to string
        franchise: String(this.leadsForm.get('franchiseCount')?.value || '0'), // Convert to string
        price: String(this.leadsForm.get('price')?.value) // Convert to string
      };

      this.adminService.submitLeads(formData).subscribe({
        next :(res) => {
          console.log(res);
          const dialogRef = this.dialog.open(AlertBoxComponent, {
            width: '350px',
            data: {
              title: 'Success',
              message: 'Leads added succesfully',
              confirmText: 'Ok',
              type:'success'
      
            }
          });
          this.leadsForm.reset();

        },
        error : (err) =>{
          console.log('error adding leads', err);
          
        }
      })
    }else{
      this.leadsForm.markAllAsTouched();
      return;
    }
  }
   
}
