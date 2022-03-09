import { PaginationParams } from 'src/app/shared/static/pagination-params.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() pagination: PaginationParams;
  @Output() newPagination = new EventEmitter<PaginationParams>(null);

  constructor() { }

  ngOnInit(): void {
  }

  to(page: number) {
    if (page >= 1 && page <= this.pagination.numberOfPages) {
      const newPagination = {
        ...this.pagination,
        page: page
      };
      this.newPagination.emit(newPagination);
    }
  }

}
