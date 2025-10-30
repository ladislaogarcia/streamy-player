import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import shaka from 'shaka-player-ui';
@Component({
  selector: 'app-shaka-player',
  imports: [],
  templateUrl: './shaka-player.html',
  styleUrl: './shaka-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShakaPlayer implements AfterViewInit {
  @ViewChild('videoPlayer') videoElementRef: ElementRef | undefined;
  @ViewChild('videoContainer') videoContainerRef: ElementRef | undefined;

  videoElement!: HTMLVideoElement;
  videoContainerElement!: HTMLDivElement;
  player!: shaka.Player;

  // constructor() {}

  private async initPlayer() {
    this.player = new shaka.Player();
    await this.player.attach(this.videoElement);

    const ui = new shaka.ui.Overlay(
      this.player,
      this.videoContainerElement,
      this.videoElement
    );
    // 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'
    //   .load('http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd')
    try {
      await this.player.load('/dash/tears_of_steel/cleartext/stream.mpd');
      // Una vez que la carga es exitosa, intentamos iniciar la reproducción.
      // this.videoElement.play();
      // La reproducción automática solo funcionará si el video está silenciado (muted).
      // const promise = this.videoElement.play();
      // if (promise !== undefined) {
      //   promise.catch((error) => {
      //     // El navegador bloqueó el autoplay. No hacemos nada y dejamos que el usuario
      //     // inicie la reproducción con los controles.
      //     console.warn('Autoplay was prevented by the browser.', error);
      //   });
      // }
    } catch (error) {
      console.error('Error loading manifest or playing video', error);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (shaka.Player.isBrowserSupported()) {
      shaka.polyfill.installAll();
      this.videoElement = this.videoElementRef?.nativeElement;
      this.videoContainerElement = this.videoContainerRef?.nativeElement;
      await this.initPlayer();
      // await this.videoElement?.play();
    } else {
      console.error('Browser not supported!');
    }
  }
}
