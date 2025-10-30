import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShakaPlayer } from '@/components/shaka-player/shaka-player';
import { HttpClient } from '@angular/common/http';
@Component({
  imports: [RouterModule, ShakaPlayer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  url: string | undefined = undefined;
  http: HttpClient = inject(HttpClient);

  constructor() {
    this.http.get<{url: string}>('/api').subscribe((data) => {
      this.url = data.url;
      console.log(data);
    });
  }
}
