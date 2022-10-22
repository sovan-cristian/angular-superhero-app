import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../../services/server.service';
import { Hero } from '../../shared/hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  @ViewChild('heroForm', { static: false }) heroForm!: NgForm;
  heroes!: Hero[];
  model = '';
  allSuperpowers!: any;
  alreadySuperpowers!: any;
  selectedPowers!: [];
  heroName!: string;
  heroSuperName!: string;
  heroImg!: string;
  public isCollapsed = true;
  editMode = 'add';
  editHeroID!: number;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.serverService.getHeroes().subscribe((data) => (this.heroes = data));
    this.serverService
      .getSuperpowers()
      .subscribe((data) => (this.allSuperpowers = data));
  }

  updateFormFields(hero: Hero) {
    this.isCollapsed = false;
    this.editMode = 'edit';
    this.heroName = hero.realName;
    this.heroSuperName = hero.superheroName;
    this.heroImg = hero.imageUrl;
    this.editHeroID = hero.id;
    this.alreadySuperpowers = this.heroes[hero.id - 1].superpowerIds;

    console.log(hero.id, this.alreadySuperpowers);

    this.allSuperpowers = this.allSuperpowers.filter(
      (data: any) => !hero.superpowerIds.includes(data.id)
    );
  }

  searchHeroes() {
    if (this.model) {
      this.heroes = this.heroes.filter(
        (data) =>
          data.realName.toLowerCase().includes(this.model.toLowerCase()) ||
          data.superheroName.toLowerCase().includes(this.model.toLowerCase())
      );
    } else {
      this.serverService.getHeroes().subscribe((data) => (this.heroes = data));
    }
  }

  addHero() {
    const numberfy = this.selectedPowers.map((data) => Number(data));
    const heroToBeAdded = {
      realName: this.heroName,
      superheroName: this.heroSuperName,
      imageUrl: this.heroImg,
      superpowerIds: numberfy,
    };

    this.serverService.addHero(heroToBeAdded);
    this.serverService.getHeroes().subscribe((data) => (this.heroes = data));
    this.toggle();
    this.heroForm.reset();

    this.serverService
      .getSuperpowers()
      .subscribe((data) => (this.allSuperpowers = data));
  }

  updateView() {
    this.serverService.getHeroes().subscribe((data) => (this.heroes = data));
  }

  toggle() {
    if (this.isCollapsed === true) {
      this.isCollapsed = false;
      this.heroForm.reset();
    } else {
      this.isCollapsed = true;
    }
    this.serverService
      .getSuperpowers()
      .subscribe((data) => (this.allSuperpowers = data));
  }

  updateHero() {
    if (this.selectedPowers) {
      const numberfy = this.selectedPowers.map((data) => Number(data));
      this.alreadySuperpowers = [...this.alreadySuperpowers, ...numberfy];
    }
    const heroToBeAdded = {
      realName: this.heroName,
      superheroName: this.heroSuperName,
      imageUrl: this.heroImg,
      superpowerIds: this.alreadySuperpowers,
    };

    this.serverService.updateSuperpower(heroToBeAdded, this.editHeroID);
    if (this.serverService.updateSuperpower(heroToBeAdded, this.editHeroID)) {
      this.updateView();
    }
    this.toggle();
    this.heroForm.reset();
    this.updateView();
  }
}
