import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss']
})
export class TutorialPage {
  constructor(private storage: Storage, private router: Router) {}

  @ViewChild(Slides)
  slides: Slides;

  async login() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/Login');
  }

  async Register() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/Registration');
  }

  next() {
    this.slides.slideNext();
  }
}
