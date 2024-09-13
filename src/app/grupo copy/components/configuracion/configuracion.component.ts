import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  public idGrupo = '';

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private configuracionService: ConfiguracionService
  ) {}

  ngOnInit(): void {
    this.getIdGrupo();
    this.detalle(this.idGrupo);
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

  detalle(idGrupo: any) {
    this.configuracionService.getDetalle(idGrupo).subscribe(
      (res) => {
        console.log('resConfiguración :>> ', res);
      },
      (err) => {
        console.log('errConfiguración :>> ', err);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
