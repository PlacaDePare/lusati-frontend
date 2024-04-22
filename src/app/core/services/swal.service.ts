import { Injectable } from '@angular/core';

import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  successSwal(message: string = 'Sucesso') {
    return Swal.fire({
      title: 'Sucesso!',
      text: message,
      icon: 'success',
      timer: 999999,
      allowEnterKey: true,
    });
  }

  confirmSwal(title: string, text: string) {
    return Swal.fire({
      title: title,
      html: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: 'var(--primary-color)',
      cancelButtonColor: 'var(--user-red)',
    });
  }

  fireSwal(options: SweetAlertOptions) {
    return Swal.fire({
      showCancelButton: true,
      ...options,
    });
  }

  errorSwal(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#48b2be',
    });
  }

  swalWithInput(options?: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire({
      ...options,
      inputAttributes: {
        autocapitalize: 'off',
      },
    });
  }
  errorSwal2(message: any) {
    return Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      showConfirmButton: false, // Oculta o botão de confirmação
      timer: 3000, // Define o tempo em milissegundos (3 segundos no exemplo)
      timerProgressBar: true, // Exibe a barra de progresso do timer
    });
  }
  deleteSwal(title: string, text: string) {
    return Swal.fire({
      title: title,
      html: text,
      imageUrl: '../../assets/svgs/svg_lixo.svg',
      background: 'var(--clear-5)',
      color: 'var(--gray-2)',
      imageWidth: 300,
      imageHeight: 150,
      imageAlt: 'Custom image',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--primary-color)',
      cancelButtonColor: 'var(--user-red)',
    });
  }
}
