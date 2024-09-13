import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tabla-cuestionario',
  templateUrl: './tabla-cuestionario.component.html',
  styleUrls: ['./tabla-cuestionario.component.scss'],
})
export class TablaCuestionarioComponent implements OnInit {
  @Input('dataPreguntas') preguntas: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<any>) {
    const original = event.previousIndex;
    const nueva = event.currentIndex;
    moveItemInArray(this.preguntas, original, nueva);
    console.log('this.movies :>> ', this.preguntas);
  }
}
