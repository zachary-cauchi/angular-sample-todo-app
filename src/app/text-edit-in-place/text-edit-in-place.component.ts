import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, fromEvent, mergeMap, Subject, Subscription, take } from 'rxjs';
import { TextEditModeDirective } from '../text-edit-mode.directive';
import { TextViewModeDirective } from '../text-view-mode.directive';

// Component for in-place text editing based on the following tutorial:
// https://netbasal.com/keeping-it-simple-implementing-edit-in-place-in-angular-4fd92c4dfc70
@Component({
  selector: 'app-text-edit-in-place',
  templateUrl: './text-edit-in-place.component.html',
  styleUrls: ['./text-edit-in-place.component.scss']
})
export class TextEditInPlaceComponent implements OnInit {

  @Input() readOnly: boolean = false;
  @Output() update = new EventEmitter();
  @ContentChild(TextViewModeDirective) viewModeTpl!: TextViewModeDirective;
  @ContentChild(TextEditModeDirective) editModeTpl!: TextEditModeDirective;

  mode: 'view' | 'edit' = 'view';

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  private viewModeHandler$: Subscription;
  private editModeHandler$: Subscription;

  constructor(
    private host: ElementRef
  ) {
    this.viewModeHandler$ = null!;
    this.editModeHandler$ = null!;
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  ngOnDestroy() {
    this.viewModeHandler$?.unsubscribe();
    this.editModeHandler$?.unsubscribe();
  }

  private viewModeHandler() {
    this.viewModeHandler$ = fromEvent(this.element, 'dblclick').pipe(
      filter(() => !this.readOnly)
    ).subscribe(() => this.toEditMode());
  }

  private editModeHandler() {
    this.element
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    )

    this.editMode$.pipe(
      mergeMap(() => clickOutside$)
    ).subscribe(() => this.toViewMode());
  }

  toEditMode() {
    this.mode = 'edit';
    this.editMode.next(true);
  }

  toViewMode() {
    this.update.emit(true);
    this.mode = 'view';
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  private get element() {
    return this.host.nativeElement;
  }

}
