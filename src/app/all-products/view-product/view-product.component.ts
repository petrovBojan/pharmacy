import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product;

  options;

  constructor(private fb: FormBuilder,
  
    private router: Router,
    public dialogRef: MatDialogRef<ViewProductComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {

      this.product = this.data.product;
      /* this.sessionsSrv.GetSessionTypes().subscribe(
        (data) => {
          this.sessionTypes = data;
        }
      ) */
     
    }
}


