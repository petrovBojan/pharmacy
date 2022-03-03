import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  previousUrl: string;
  constructor(private location: Location) { }

  ngOnInit() { }

  goBack() {
    this.location.back();
  }

}
