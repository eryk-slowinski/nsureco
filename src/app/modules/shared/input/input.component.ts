import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input()
  inputType: string = '';
  @Input()
  labelFor: string = '';
  @Input()
  labelText: string = '';
  @Input()
  ngModel: any;

}
