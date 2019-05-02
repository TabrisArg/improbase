import { GameserviceService } from './../../services/gameservice.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss']
})
export class ShowGameComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  numberValue: 0;
  searchValue: '';
  items: Array<any>;
  numberFilteredItems: Array<any>;
  titleFilteredItems: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: GameserviceService,
    private location: Location,
    private fb: FormBuilder,


  ) { }

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

  cancel() {
    this.router.navigate(['/home']);
  }

  getData() {
    this.firebaseService.getGames()
    .subscribe(result => {
      // this.ageFilteredItems
      this.items = result;
      this.titleFilteredItems = result;
      this.numberFilteredItems = result;
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

}
