import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatTabsModule, RouterModule, MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentTab: string= 'chat' ;
  title = '<mat-icon>home</mat-icon>chatbot-Application';
}
