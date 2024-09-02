import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Apk } from '../../common/models/apk.model';
import { Categoria } from './../../common/models/categoria.models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule


@Component({
  selector: 'app-apk-list',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],  // Asegúrate de que IonicModule esté aquí
  templateUrl: './apklist.component.html',
  styleUrls: ['./apklist.component.scss'],
})
export class ApkListComponent implements OnInit {
  apks$: Observable<Apk[]>;

   categorias$: Observable<Categoria[]>;
  filteredApks$: Observable<Apk[]>;
  selectedCategory: string = '';

    private categoryFilter$ = new BehaviorSubject<string>('');


  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.apks$ = this.firestoreService.getApks();
    this.categorias$ = this.firestoreService.getCategorias();

    this.filteredApks$ = combineLatest([this.apks$, this.categoryFilter$]).pipe(
      map(([apks, filter]) =>
        filter ? apks.filter(apk => apk.categoriaId === filter) : apks
      )
    );
  }

  filterApks() {
    this.categoryFilter$.next(this.selectedCategory);
  }
}
