import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/services/server.service';
import { Hero } from 'src/app/shared';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class NgbdModalBasic implements OnInit {
  @Input() hero!: Hero;
  @Input() missingSuperpowers: any;
  @Output() updatedPowers = new EventEmitter();
  closeResult = '';
  selectedPowers!: [];

  constructor(
    private modalService: NgbModal,
    private serverService: ServerService
  ) {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {}

  displaypowers() {
    const numberfy = this.selectedPowers.map((data) => Number(data));

    this.hero.superpowerIds = [...this.hero.superpowerIds, ...numberfy];
    this.serverService.updateSuperpower(this.hero, this.hero.id);

    if (this.serverService.updateSuperpower(this.hero, this.hero.id)) {
      this.updatedPowers.emit();
    }
  }
}
