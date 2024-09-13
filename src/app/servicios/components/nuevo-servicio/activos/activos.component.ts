import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.scss']
})
export class ActivosComponent implements OnInit {

  constructor(private router: Router) { 


  }

  ngOnInit(): void {
  }

  cancel(): void{
    this.router.navigate(['servicios/listado']);
 }


}
