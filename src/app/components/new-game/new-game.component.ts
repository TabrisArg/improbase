import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ImageComponent } from '../image/image.component';
import { Router } from '@angular/router';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
  value = '';
  typeControl = new FormControl();
  types: string[] = ['Long form', 'Short form', 'Musical'];

  exampleForm: FormGroup;
  imageLink = 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

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
    description: [
      {type: 'required', message: 'description is required.'}
    ],
    category: [
      {type: 'required', message: 'category is required.'}
    ],
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public GameService: GameserviceService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.exampleForm = this.fb.group({
      title: ['', Validators.required],
      players: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      notes: [''],
      variations: [''],
      number: ['']
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImageComponent, {
      height: '400px',
      width: '400px'
  });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imageLink = result.link;
      }
    });
  }

  resetFields() {
    this.imageLink = 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      players: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      notes: new FormControl(''),
      variations: new FormControl(''),
      number: new FormControl('')
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  onSubmit(value) {
    this.GameService.createGame(value, this.imageLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

}
