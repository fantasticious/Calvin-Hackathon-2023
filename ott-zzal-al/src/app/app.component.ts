import { Component } from '@angular/core';
import { ClothesService } from './services/clothes.service';
import { Top, Bottom } from './services/clothes.service';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface possibleBottoms {
  jeans: string[];
  joggers: string[];
  leggings: string[];
  shorts: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  top: Top | unknown;
  chosenTopColor: string = '';
  topColors: string[] = [];
  possibleBottoms: possibleBottoms | any;
  possibleBottomTypes: string[] = [];
  possibleBottomsAvailable: boolean = false;
  possibleBottomColors: string[] = [];
  bottomColorScheme: string[] = [];
  rand6BottomColorScheme: string[] = [];

  bottom: Bottom | unknown;
  chosenBottomColor: string = '';
  bottomColors: string[] = [];

  /* functions to manipulate state */
  constructor(private db: AngularFirestore) {}

  getTopColors = (top: string) => {
    this.top = top;
    this.db
      .collection<Top>(`${top}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.topColors = res.map((elem) => elem.color);
          console.log('top colors: ', this.topColors);
        }
      });
  };

  getBottomColors = (bottom: string) => {
    this.bottom = bottom;
    this.db
      .collection<Bottom>(`${bottom}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.bottomColors = res.map((elem) => elem.color);
          console.log('bottom colors: ', this.bottomColors);
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

  onChooseTopColor(color: string) {
    this.chosenTopColor = color;
    // console.log(this.chosenTopColor);
    this.db
      .doc<Top>(`${this.top}/${this.chosenTopColor}`)
      .valueChanges()
      .subscribe((matchList) => {
        if (matchList) {
          const {color, ...rest} = matchList;
          this.possibleBottoms = rest;
          this.possibleBottomTypes = Object.keys(this.possibleBottoms)
          this.possibleBottomsAvailable = true;
        }
      });
  }

  onChooseBottomType = (bottomType: string): void =>  {
    this.possibleBottoms[bottomType];
    this.bottomColorScheme = this.possibleBottoms[bottomType];
    this.rand6BottomColorScheme = this.bottomColorScheme.slice(0, 6);
    console.log(this.rand6BottomColorScheme)
  }
}

