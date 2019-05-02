import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { GameserviceService } from 'src/app/services/gameservice.service';
@Injectable()
export class EditGameResolver implements Resolve<any> {

  constructor(public firebaseService: GameserviceService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const gameId = route.paramMap.get('id');
      this.firebaseService.getGame(gameId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
