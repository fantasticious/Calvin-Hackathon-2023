import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  // a way to get data from a parent component
  @Input() team: string[] = [];
  @Input() idx = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
