import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
})
export class GrupoComponent implements OnInit {
  public idGrupo: any = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getIdGrupo();
  }

  getIdGrupo() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.idGrupo = params.get('id') || '';
      } else {
        console.log('mmmmm :>> ');
      }
    });
  }

  public nuevaSolicitud() {
    console.log("sldjnvkdj")
    this.router.navigate(["solicitudes", "nuevaSolicitud"], {
      queryParams: {
        grupo: this.idGrupo
      }
    })
  }
}
