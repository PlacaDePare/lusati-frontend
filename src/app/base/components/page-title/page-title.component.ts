import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PageTitleComponent {
  showCreate = true;
  showFilter = false;

  @Output() handleCreate = new EventEmitter<boolean>(this.showCreate);
  @Output() handleFilter = new EventEmitter<boolean>(this.showFilter);

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() filter: boolean = false;
  @Input() create: boolean = false;

  handleShowCreate() {
    this.showCreate = !this.showCreate;
    this.handleCreate.emit(this.showCreate);
  }
  handleShowFilter() {
    this.showFilter = !this.showFilter;
    this.handleFilter.emit(this.showFilter);
  }
}
