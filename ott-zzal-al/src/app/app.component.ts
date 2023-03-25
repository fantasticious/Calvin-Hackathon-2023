import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ClothesService } from './services/clothes.service';
import { Tshirt } from './services/clothes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // states
  newMember = "";
  memberArray: string[] = [];
  errorMsg = "";
  numberOfTeams: number | "" = "";
  teams: string[][] = [] // array of array of strings

  /* functions to manipulate state */
  constructor(private clothesSvc: ClothesService) {

  }
  
  // click event: adds new member to array of members
  addNewMember = () => {
    if (!this.newMember) {
      this.errorMsg = "Please add a name";
    } else {
      // add new member to array
      this.memberArray.push(this.newMember);
      // clear input and error error message
      this.newMember = this.errorMsg = "";
    }
  }

  // input event: changes state of newMember whenever textbox is changed
  onInputName = (member: string) => {
    this.newMember = member; 
    // console.log(this.newMember);
  }

  onEnterNumberOfTeams = (numberOfTeams: any) => {
    console.log(typeof numberOfTeams);
    this.numberOfTeams = Number(numberOfTeams);
    console.log(this.numberOfTeams);
  }

  generateTeams = () => {
    // check for members
    if (!this.memberArray.length) {
      this.errorMsg = "Enter members to generate teams";
    }
    // check for valid number of teams
    else if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMsg = "invalid number of teams";
    } 
    // check if number of groups is greater than the number of members
    else if (this.numberOfTeams > this.memberArray.length) {
      this.errorMsg = "more number of teams than members--invalid input";
    }
    // create groups if all inputs are valid
    else {
      // create copy of memberArray list
      const memberArrayCopy = [...this.memberArray];
      // generate random teams
      while (memberArrayCopy.length) {
        // ++i doesn't work!!
        for (let i=0; i<this.numberOfTeams; i++) {
          const randomIdx = Math.floor(Math.random() * memberArrayCopy.length); // need to use floor!!
          // splice returns an array of the items that were removed from the original array
          const memberToAssignToGroup = memberArrayCopy.splice(randomIdx, 1)[0];

          // check if anyone's left; break out of loop if done
          if (!memberToAssignToGroup) {
            break;
          }
          
          // if second time going through memberToAssignToGroup
          if (this.teams[i]) {
            this.teams[i].push(memberToAssignToGroup);
          } 
          // on first round: make new arrays
          else {
            this.teams[i] = [memberToAssignToGroup];
          }
        } 
      }
      // clear input field and error msg
      this.memberArray = [];
      this.numberOfTeams = this.errorMsg = "";
    }
  }
  
}
