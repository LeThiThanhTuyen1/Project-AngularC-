import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public cont: Contact = {
    Id: 0,
    Name: '',
    Email: '',
    Phone: '',
    Message: ''
  };

  public message: string = '';
  public formSubmitted: boolean = false;

  constructor(private contactService: ContactService, private router: Router) {}

  submitContact(): void {
    this.formSubmitted = true;
    if (this.cont.Name && this.cont.Email && this.cont.Phone && this.cont.Message) {
      this.contactService.createContact(this.cont)  // Passing the correct object
        .subscribe(
          response => {
            console.log('Gửi tin nhắn thành công', response);
            this.message = 'Gửi tin nhắn thành công';
            this.resetForm();
          },
          error => {
            console.error('Gửi tin nhắn thất bại', error); // Log chi tiết lỗi
            this.message = 'Gửi tin nhắn thất bại: ' + error.message;
          }
        );
    } else {
      this.message = 'Làm ơn điền vào các trường còn trống';
    }
  }

  resetForm() {
    this.cont = {
      Id: 0,
      Name: '',
      Email: '',
      Phone: '',
      Message: ''
    };
    this.formSubmitted = false;
  }
}
