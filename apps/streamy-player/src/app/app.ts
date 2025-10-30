import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShakaPlayer } from '@/components/shaka-player/shaka-player';
@Component({
  imports: [RouterModule, ShakaPlayer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Streamy Player';
}
