import { Component, Input } from '@angular/core';
import { MenuOption } from 'src/app/types/menu.options';

@Component({
  selector: 'e-commerce-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuOptions: MenuOption[] | null;
  token: string;
  constructor() {
    this.menuOptions = null;
    this.token = '';
  }
}
