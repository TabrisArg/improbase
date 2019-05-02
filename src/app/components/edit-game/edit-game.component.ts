import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ImageComponent } from '../image/image.component';
import { GameserviceService } from 'src/app/services/gameservice.service';


@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  validationMessages = {
    title: [
      {type: 'required', message: 'title is required.'}
    ],
    players: [
      {type: 'required', message: 'number of players is required.'}
    ],
    type: [
      {type: 'required', message: 'type of game is required.'}
    ],
    category: [
      {type: 'required', message: 'category is required.'}
    ],
    description: [
      {type: 'required', message: 'description is required.'}
    ],
  };

  constructor(
    private firebaseService: GameserviceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data']; // might have to change the .data thing
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }


  createForm() {
    this.exampleForm = this.fb.group({
      title: [this.item.title, Validators.required],
      players: [this.item.players, Validators.required],
      type: [this.item.type, Validators.required],
      category: [this.item.category, Validators.required],
      description: [this.item.description, Validators.required],
      notes: [this.item.notes],
      variations: [this.item.variations],
      number: [this.item.number]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImageComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.image = result.link;
      }
    });
  }

  onSubmit(value) {
    value.image = this.item.image;
    value.number = Number(value.number);
    this.firebaseService.updateGame(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    );
  }

  delete() {
    this.firebaseService.deleteGame(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
