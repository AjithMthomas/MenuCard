import { Injectable, inject } from '@angular/core';
import { UserRepository } from '../repository/user-repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRepository = inject(UserRepository);

  fetchCategories(uid:string): Observable<any>{
    return this.userRepository.fetchCategories(uid)
  }

  fetchProducts(uid:string): Observable<any>{
    return this.userRepository.fetchProducts(uid)
  }

}
