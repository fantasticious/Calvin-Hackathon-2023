import { Component } from '@angular/core';
import { ClothesService } from './services/clothes.service';
import { Top, Bottom } from './services/clothes.service';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  top: Top | unknown;
  topColors: string[] = [];
  bottom: Bottom | unknown;
  bottomColors: string[] = [];

  /* functions to manipulate state */
  constructor(private db: AngularFirestore) {
  }

  getTopColors = (top: string) => {
    this.db
      .collection<Top>(`${top}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.topColors = res.map((elem) => elem.color)
          console.log("top colors: ", this.topColors)
        }
      });
  };

  getBottomColors = (bottom: string) => {
    this.db
      .collection<Bottom>(`${bottom}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.bottomColors = res.map((elem) => elem.color)
          console.log("bottom colors: ", this.bottomColors)
        }
      });
  };

  getTop = (top: string, color: string) => {
    if (top === 'tshirts' && color === 'ffffff') {
      color = 'white';
    }
    this.db
      .doc<Top>(`${top}/${color}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.top = res;
          console.log('t: ', this.top);
        }
      });
  };

  getBottom = (bottom: string, color: string) => {
    this.db
      .doc<Bottom>(`${bottom}/${color}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.bottom = res;
          console.log('b: ', this.top);
        }
      });
  };
}
