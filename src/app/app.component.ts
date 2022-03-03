import { Component } from '@angular/core';
import { IconService } from './icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apteka';
  constructor(
    private iconService: IconService) {
  }

  ngOnInit() {
    
    this.iconService.registerIcons();
  }
}
