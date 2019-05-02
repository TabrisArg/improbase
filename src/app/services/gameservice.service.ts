import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  constructor(public db: AngularFirestore) { }

  getImages() {
    return this.db.collection('/image').valueChanges();
  }

  getGame(gameKey) {
    return this.db.collection('games').doc(gameKey).snapshotChanges();
  }

  updateGame(gameKey, value) {
    value.titleToSearch = value.title.toLowerCase();
    return this.db.collection('games').doc(gameKey).set(value);
  }

  deleteGame(gameKey) {
    return this.db.collection('games').doc(gameKey).delete();
  }

  getGames() {
    return this.db.collection('games').snapshotChanges();
  }

  searchGames(searchValue) {
    return this.db.collection('games', ref => ref.where('titleToSearch', '>=', searchValue)
    .where('titleToSearch', '<=', searchValue + '\uf8ff'))
    .snapshotChanges();
  }

  searchGamesByForm(value) {
    return this.db.collection('games', ref => ref.orderBy('form').startAt(value)).snapshotChanges();
  }

  searchGamesByNumber(value) {
    return this.db.collection('games', ref => ref.orderBy('number').startAt(value)).snapshotChanges();
  }

  createGame(value, image) {
    return this.db.collection('games').add({
      title: value.title,
      titleToSearch: value.title.toLowerCase(),
      players: value.players,
      type: value.type,
      category: value.category,
      description: value.description,
      variations: value.variations,
      notes: value.notes,
      number: value.number,
      image: image
    });
  }
}
