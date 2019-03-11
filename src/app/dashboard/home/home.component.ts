import { Component, OnInit, Output, Directive, EventEmitter } from '@angular/core';
import { CountryService } from '../../_services/countryservice';
import { MenuItem } from '../../_shared/common/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() delete = new EventEmitter();

  cols: any[] = [];
  data: any[];
  items: MenuItem[];
  config: any = {
    paginator: true, // Done
    sorting: true, // Done
    search: true, // Done
    export: true, // done,
    colfilter: true,
    offset: '7'
  };

  constructor(private countryService: CountryService) {
    this.data = [
      { model: 'Audi1', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi2', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi3', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi4', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi5', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi6', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi6', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi7', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi8', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi10', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi11', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi12', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi13', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi14', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi15', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi16', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi17', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi18', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi19', year: 2010, brand: 'Audi', color: 'black' },
      { model: 'Audi20', year: 2010, brand: 'Audi', color: 'black' },

    ];
    this.cols = [
      { field: 'model', header: 'Model', sort: true, visible: true },
      { field: 'year', header: 'Year', sort: true, visible: true },
      { field: 'brand', header: 'Brand', sort: false, visible: false },
      { field: 'color', header: 'Color', sort: false, visible: true },
      { field: 'action', header: 'Action', sort: false, visible: true }
    ];

    this.bind();
  }

  bind() {
    const act = `<a href="javascript:void(0)">
                <i class="pi pi-pencil"></i></a>
                <a href="javascript:void(0)">
                <i class="pi pi-trash"></i></a>`;
    // let act = `<a href="javascript:void(0) (click)='showAuthor($event, 1)'>Show</a>`;
    for (let i = 0; i < this.data.length; i++) {
      this.data[i]['action'] = act;
    }
  }

  showAuthor($event, id) {
    alert('hi');
  }
  ngOnInit() { }
}
