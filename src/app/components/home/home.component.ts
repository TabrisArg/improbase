import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/services/user';
import { auth } from 'firebase';
import { AdminsService } from 'src/app/services/admins.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numberValue: 0;
  searchValue: '';
  items: Array<any>;
  numberFilteredItems: Array<any>;
  titleFilteredItems: Array<any>;
  userId: string;


  constructor(
    private firebaseService: GameserviceService,
    private router: Router,
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.getData();
    this.auth.getAdmin();
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

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  showGame(item) {
    this.router.navigate(['/show/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByTitle() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchGames(value)
    .subscribe(result => {
      this.titleFilteredItems = result;
      this.items = this.combineLists(result, this.numberFilteredItems);
    });
  }

  rangeChange(event) {
    this.firebaseService.searchGamesByNumber(event.value)
    .subscribe(result => {
      this.numberFilteredItems = result;
      this.items = this.combineLists(result, this.titleFilteredItems);
    });
  }

combineLists(a, b) {
  const result = [];

  a.filter(x => {
    return b.filter(x2 => {
      if (x2.payload.doc.id === x.payload.doc.id) {
        result.push(x2);
      }
    });
  });
  return result;
}

}
