import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() inputType: string = '';
  @Input() labelFor: string = '';
  @Input() labelText: string = '';
  @Input() inputValue: string = '';
  @Output() emittedValue = new EventEmitter<string>();

  onEmit() {
    this.emittedValue.emit(this.inputValue)
  }

}
