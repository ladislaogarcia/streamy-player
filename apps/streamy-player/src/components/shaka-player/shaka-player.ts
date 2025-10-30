import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
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
export class ShakaPlayer implements OnChanges, AfterViewInit {
  @ViewChild('videoPlayer') videoElementRef: ElementRef | undefined;
  @ViewChild('videoContainer') videoContainerRef: ElementRef | undefined;

  @Input() url?: string | undefined;

  videoElement!: HTMLVideoElement;
  videoContainerElement!: HTMLDivElement;
  player!: shaka.Player;
  error: string | undefined = undefined;
  errorMessage: string | undefined = undefined;

  // constructor() {}

  private async createPlayerUI() {
    this.player = new shaka.Player();
    await this.player.attach(this.videoElement);
    // Also it can ve storaged in a variable if needed later
    // const ui = new shaka.ui.Overlay(
    //   this.player,
    //   this.videoContainerElement,
    //   this.videoElement
    // );
    new shaka.ui.Overlay(
      this.player,
      this.videoContainerElement,
      this.videoElement
    );
  }

  private async initPlayer() {
    if (this.player && this.url) {
      this.player
        .load(this.url)
        .then(() => {
          this.error = undefined;
          this.errorMessage = undefined;
        })
        .catch((error: unknown) => {
          const msg = error instanceof Error ? error.message : String(error);
          this.errorMessage = 'Error loading manifest or playing video';
          this.error = msg;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['url']) {
      const { currentValue, previousValue, firstChange, isFirstChange } =
        changes['url'];
      if (!firstChange) {
        this.createPlayerUI();
      }
      if (currentValue !== previousValue ) {
        this.initPlayer();
      }
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
