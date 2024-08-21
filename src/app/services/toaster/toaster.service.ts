import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }

  successToast(message:string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      html: `
      <div style="display:flex;justify-content:start;align-items:center;font-family:Product Sans;gap:10px;position:relative;width: 400px;border-radius: 50px;background-color:#E5F2D1;padding:10px 25px;width:100%;">
      <img src="assets/icon/success.svg" alt="" />
      <div>
      <h1 style=" margin: 0;font-size: 18px; ">Success</h1>
      <p style="font-size: 14px;">${message}</p>
      </div>
      <img style="position: absolute;right: 30px;top: 35%;cursor: pointer;" src="assets/icon/close-toast.svg" alt="" />
      </div>
     `,
      timer: 3000,
    });
  }
  errorToast(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      html: `
      <div style="display:flex;justify-content:start;align-items:center;font-family:Product Sans;gap:10px;position:relative;width: 400px;border-radius: 50px;background-color:#ffb2b2;padding:10px 25px;width:100%;">
      <img style="width:24px ;height:24px" src="assets/icon/error-toast.png" alt="" />
      <div>
      <h1 style=" margin: 0;font-size: 18px; ">An error occurred</h1>
      <p style="font-size: 14px;">${message}</p>
      </div>
      <img style="position: absolute;right: 30px;top: 35%;cursor: pointer;" src="assets/icon/close-toast.svg" alt="" />
      </div>
     `,
      timer: 3000,
    });
  }

}
