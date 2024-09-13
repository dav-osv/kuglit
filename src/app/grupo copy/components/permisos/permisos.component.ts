import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {  }

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent implements OnInit {
  public idGrupo = '';
  // Banderas
  public allCanPost: boolean = false;
  public activChat: boolean = false;
  // AngularMultiSelectModule | region
  public dropdownListRegion: object[] = [];
  public selectedRegion: object[] = [];
  public settingsRegion = {};
  // AngularMultiSelectModule | localidad
  public dropdownListLocalidad: object[] = [];
  public selectedLocalidad: object[] = [];
  public settingsLocalidad = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getIdGrupo();
    this.dropDawnList();
  }

  getIdGrupo() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.idGrupo = params.get('id') || '';
        console.log('this.idGrupo :>> ', this.idGrupo);
      } else {
        console.log('okokok :>> ');
      }
    });
  }

  dropDawnList() {
    this.dropdownListRegion = [
      { id: 1, itemName: 'India' },
      { id: 2, itemName: 'Singapore' },
      { id: 3, itemName: 'Australia' },
      { id: 4, itemName: 'Canada' },
      { id: 5, itemName: 'South Korea' },
      { id: 6, itemName: 'Germany' },
      { id: 7, itemName: 'France' },
      { id: 8, itemName: 'Russia' },
      { id: 9, itemName: 'Italy' },
      { id: 10, itemName: 'Sweden' },
    ];
    this.selectedRegion = [
      { id: 2, itemName: 'Singapore' },
      { id: 3, itemName: 'Australia' },
    ];
    this.settingsRegion = {
      singleSelection: false,
      text: 'Selecciona las regiones',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Borrar selecionados',
      enableSearchFilter: true,
      filterSelectAllText: 'Seleccionar filtrados',
      filterUnSelectAllTex: 'Borrar filtrados seleccionados',
      maxHeight: 200,
      classes: 'myclass inputRegiones',
      searchPlaceholderText: 'Buscar',
    };
    // localidad
    this.dropdownListLocalidad = [
      { id: 1, itemName: 'India' },
      { id: 2, itemName: 'Singapore' },
      { id: 3, itemName: 'Australia' },
      { id: 4, itemName: 'Canada' },
      { id: 5, itemName: 'South Korea' },
      { id: 6, itemName: 'Germany' },
      { id: 7, itemName: 'France' },
      { id: 8, itemName: 'Russia' },
      { id: 9, itemName: 'Italy' },
      { id: 10, itemName: 'Sweden' },
    ];

    this.settingsLocalidad = {
      singleSelection: false,
      text: 'Selecciona las localidades',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Borrar selecionados',
      enableSearchFilter: true,
      filterSelectAllText: 'Seleccionar filtrados',
      filterUnSelectAllTex: 'Borrar filtrados seleccionados',
      maxHeight: 200,
      classes: 'myclass inputRegiones',
      searchPlaceholderText: 'Buscar',
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedRegion);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedRegion);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
