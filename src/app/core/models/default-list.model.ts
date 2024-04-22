// Providers
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";

export class DefaultList {

  page: number = 1;
  pageSize: number = 10;
  total: number = 1;
  order: string = 'id';
  orderDirection: string = 'desc'

  filterForm: FormGroup = new FormGroup({});
  filter: Subject<any> = new Subject();
  filterOn: boolean = false;

  pageSizeSelector: any = [
    {value: 10, text: '10 registros por página'},
    {value: 50, text: '50 registros por página'},
    {value: 100, text: '100 registros por página'},
  ];

  constructor() {}
}
