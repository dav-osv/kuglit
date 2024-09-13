import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { LocalstorageService } from '../../../core/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _regExMail =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localstorageService: LocalstorageService
  ) {
    this.builForm();
  }

  ngOnInit(): void {}
  // @autor Víctor Peña victor.martinez@nordsterntech.com
  // formulario con validaciones para el login
  private builForm(): void {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.pattern(this._regExMail)]],
      pwd: ['', [Validators.required]],
      // pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
    // this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
    //   console.log('value :>>ok ', value);
    // });
  }

  // @autor Víctor Peña victor.martinez@nordsterntech.com
  // Evento que diaspara el submit del formulario y se conecta
  // con el servico para hacer la peticion http de login
  save(event: Event): void {
    event.preventDefault();
    if (this.loginForm.valid) {
      // login
      const formValue = this.loginForm.value;
      this.authService.login(formValue).subscribe(
        (res) => {
          this.localstorageService.set('DATA_LOGIN', res);
          this.router.navigate(['./dashboard']);
        },
        (err) => {
          console.log('err :>> ', err);
          throw err;
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // @autor Víctor Peña victor.martinez@nordsterntech.com
  // getters para mandar mensajes al usuario en caso de que
  // los valores no sean validos

  get correoField(): any {
    return this.loginForm.get('correo');
  }

  get correoFieldIsInvalid(): any {
    return this.correoField.touched && this.correoField.invalid;
  }

  get pwdField(): any {
    return this.loginForm.get('pwd');
  }

  get pwdFieldIsInvalid(): any {
    return this.pwdField.touched && this.pwdField.invalid;
  }
}
