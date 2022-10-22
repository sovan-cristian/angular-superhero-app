import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Hero, Superpower } from 'src/app/shared';

@Component({
  selector: 'app-superpowers',
  templateUrl: './superpowers.component.html',
  styleUrls: ['./superpowers.component.css'],
})
export class SuperpowersComponent implements OnInit {
  @Input() hero!: Hero;
  @Output() anotherEmitter = new EventEmitter();
  currentSuperpowers!: Superpower[];
  allSuperpowers!: Superpower[];
  notSuperpowers!: Superpower[];

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    if (this.hero.superpowerIds.length == 0) {
    } else {
      this.serverService
        .getSuperpowerByIDs(this.hero.superpowerIds)
        .subscribe((data: any) => (this.currentSuperpowers = data));
    }
    this.allSuperpowers = this.serverService.allSuperpowers;

    this.notSuperpowers = this.allSuperpowers.filter(
      (data) => !this.hero.superpowerIds.includes(data.id)
    );
  }

  deletePower(power: any) {
    const index = this.currentSuperpowers.indexOf(power);
    this.currentSuperpowers.splice(index, 1);

    const newPowers = this.currentSuperpowers.map((data) => data.id);
    this.hero.superpowerIds = newPowers;

    this.serverService.updateSuperpower(this.hero, this.hero.id);
    if (this.serverService.updateSuperpower(this.hero, this.hero.id)) {
      this.anotherEmitter.emit();
    }
  }

  refreshPowers() {
    this.anotherEmitter.emit();
  }
}
