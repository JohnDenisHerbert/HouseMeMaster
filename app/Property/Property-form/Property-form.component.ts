import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-Property-form',
  templateUrl: './Property-form.component.html',
  styleUrls: ['./Property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  constructor(
    private db: DbService,
    private auth: AuthService,
    public modal: ModalController,
    private fb: FormBuilder, // private params: NavParams
    private storage: AngularFireStorage
    ) {}

  PropertyForm: FormGroup;

  Property;

  ngOnInit() {
    const data = {
      content: '',
      Price: '',
      City: '',
      DisplayName: '',
      PhotoURL: '',
      Amenities: '',

      status: 'Available',
      ...this.Property
    };
    this.PropertyForm = this.fb.group({
      content: [
        data.content,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250)
        ]
      ],
      Price: [
        data.Price,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(6)
        ]
      ],
      City: [
        data.City,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ],
      DisplayName: [
        data.DisplayName,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ],
      PhotoURL: [
        data.PhotoURL,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000)
        ]
      ],
      Amenities: [
        data.Amenities,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ]
      ],
      status: [data.status, [Validators.required]]
    });
  }

  async createProperty() {
    const uid = await this.auth.uid();
    const id = this.Property ? this.Property.id : '';
    const data = {
      uid,
      createdAt: Date.now(),
      ...this.Property,
      ...this.PropertyForm.value
    };

    this.db.updateAt(`Propertys/${id}`, data);
    this.modal.dismiss();
  }

  
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

 async uploadFile(event) {    
    const uid = await this.auth.uid();
    const file = event.target.files[0];
    const filePath = `test/${uid}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }


}
