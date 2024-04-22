import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ContactsModel } from '../views/contacts/models/contacts.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpService) {}

  combo(): Observable<any> {
    return this.http.get('groups/combo');
  }
}
