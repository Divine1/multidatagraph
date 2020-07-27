import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() items = [];
  @Output() onNewItem = new EventEmitter<string>();
  item = "";
  constructor() { }

  ngOnInit() {
  }
  addItem(){
    console.log("in addItem item ",this.item)
    this.onNewItem.emit(this.item);
  }
}
