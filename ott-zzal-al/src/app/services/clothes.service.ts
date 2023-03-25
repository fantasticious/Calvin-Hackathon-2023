import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { getFirestore } from "firebase/firestore";

export interface Tshirt {
  color: string;
  jeans: string[];
  joggers?: string[];
  leggings?: string[];
  shorts?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private shirt: Tshirt | undefined;
  public shirt$: BehaviorSubject<Tshirt> = new BehaviorSubject<Tshirt>({color: "", jeans: []});

  constructor() { 
    
  }
}