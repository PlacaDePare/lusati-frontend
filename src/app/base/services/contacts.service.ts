import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ContactsModel } from '../views/contacts/models/contacts.model';

export interface SyncInterface {
  contactId: number | null;
  groupIds: Array<number>;
}

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpService) {}

  list(params: any, loading?: boolean): Observable<any> {
    return this.http.get('contacts', params, loading);
  }

  create(model: ContactsModel): Observable<any> {
    return this.http.post('contacts', model);
  }

  show(id: number | null): Observable<any> {
    return this.http.get('contacts/' + id);
  }

  edit(model: ContactsModel): Observable<any> {
    return this.http.put('contacts/' + model.id, model);
  }

  delete(model: ContactsModel): Observable<any> {
    return this.http.delete('contacts/' + model.id);
  }

  status(model: ContactsModel): Observable<any> {
    return this.http.put('contacts/status/' + model.id, model);
  }

  sync(model: SyncInterface): Observable<any> {
    return this.http.post('contacts/sync', model);
  }
}
