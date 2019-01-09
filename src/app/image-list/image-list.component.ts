import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  
  images: any[];
  response: any[];
  start: number;
  end: number;
  imagesFound: boolean = false;
  searching: boolean = false;
  length: number = 0;
  pageSize: number = 5;
  currentpageIndex: number = 0;
  pageEvent: PageEvent;
  paginatorFlag: boolean = false;
  resultTag: string;
  searchQuery: string;

  handleSuccess(data){
    console.log(data.hits);
    this.imagesFound = true;
    this.response = data.hits;
    this.length = data.totalHits;
    this.paginatorFlag = true;
    this.spliceItems();
  }

  handleError(error){
    console.log(error);
  }

  constructor(private _imageService : ImageService) { }

  searchImages(query: string){
    this.searching = true;
    this.resultTag = query;
    return this._imageService.getImage(query).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  }

  ngOnInit() {
  }

  public handlePagination(event?: PageEvent){    
    this.searching = true;
    console.log(" Inside pagination handler "+JSON.stringify(event));
    this.pageSize = event.pageSize;
    this.currentpageIndex = event.pageIndex;
    this.spliceItems();
    this.searching = false;
  }

  spliceItems(){
    this.start = this.currentpageIndex * this.pageSize;
    this.end = (this.currentpageIndex + 1) * this.pageSize;
    this.images = this.response.slice(this.start, this.end);
    console.log(this.images);
  }
}
