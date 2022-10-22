import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Hero } from 'src/app/shared';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  @Input() hero!: Hero;
  @Output() deletedHero = new EventEmitter();
  @Output() editHeroInfo = new EventEmitter();

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {}

  deleteHero(id: any) {
    this.serverService.deleteHero(id);

    if (this.serverService.deleteHero(id)) {
      this.deletedHero.emit();
    }
  }

  keepGoing() {
    this.deletedHero.emit();
  }

  editHero() {
    this.editHeroInfo.emit(this.hero);
  }
}
