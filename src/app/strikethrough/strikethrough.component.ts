import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-strikethrough',
  templateUrl: './strikethrough.component.html',
  styleUrls: ['./strikethrough.component.scss']
})
export class StrikethroughComponent implements OnInit {

  @Input() strike: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
