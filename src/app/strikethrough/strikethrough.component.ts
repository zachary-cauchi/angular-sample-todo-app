import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-strikethrough',
  templateUrl: './strikethrough.component.html',
  styleUrls: ['./strikethrough.component.scss']
})
export class StrikethroughComponent implements OnInit, OnChanges {

  @Input() strike: boolean = false;

  // Internal state for controlling animations.
  // None (default): No animation
  // Strike: Strike the inner text.
  // Unstrike: Unstrike the inner text.
  _strikeState: 'none' | 'strike' | 'unstrike' = 'none';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If we didn't just load in, perform the strike update.
    if (changes['strike'].previousValue !== undefined) {
      this.updateStrike(this.strike);
    }
  }

  updateStrike(newStrike: boolean) {
    this._strikeState = newStrike
    ? 'strike'
    : 'unstrike';
  }

}
