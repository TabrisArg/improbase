import { Component, OnInit } from '@angular/core';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  images: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<ImageComponent>,
    public firebaseService: GameserviceService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getImages()
    .subscribe(data => this.images = data);
  }

  close(image) {
    this.dialogRef.close(image);
  }

}
