import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  
  constructor() { }

  isOpen : boolean = false;

  addUserForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    password: new FormControl('')
  })
  
  close() {
    this.modal.dismiss()
  }
 

  ngOnInit() {}

}
