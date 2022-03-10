import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  searchValue: string;
  @ViewChild('search', { static: false }) searchInput : ElementRef;
  @Output() searchFor = new EventEmitter<string>(null);

  constructor() { }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(debounce(() => timer(500)))
      .subscribe((event: InputEvent) => this.searchFor.emit(event.target['value']))
  }
  
  // onChange(event) {
  //   console.log(this.searchInput)
  //   // console.log(event)
  // }

}
