import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss'
})
export class FilterListComponent {

  selectedFilters: string[] = []

  @Output() filterChange = new EventEmitter<string[]>();

  addFilter( event: Event, filter: string) {
    const isChecked = (event.target as HTMLInputElement).checked

    isChecked ? this.selectedFilters.push(filter) : this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1)

    this.filterChange.emit(this.selectedFilters)
  }

}
