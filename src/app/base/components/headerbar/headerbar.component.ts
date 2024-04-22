import { Component } from '@angular/core';

interface User {
  name: string,
  type: string,
}

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent {

  user: User = {
    name: 'Vitor Helker',
    type: 'Admnistrador'
  }

  constructor() {}
}
