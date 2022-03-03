import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-emploee',
  templateUrl: './view-emploee.component.html',
  styleUrls: ['./view-emploee.component.css']
})
export class ViewEmploeeComponent implements OnInit {

  emploee;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ViewEmploeeComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.emploee = this.data.emploee;
  }

}
