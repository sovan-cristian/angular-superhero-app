import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Hero } from '../shared';

@Injectable()
export class ServerService {
  private readonly baseUrl: string;
  public allSuperpowers!: any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
    this.getSuperpowers().subscribe((data) => (this.allSuperpowers = data));
  }

  getHeroes(): Observable<Hero[]> {
    const url = `${this.baseUrl}/heroes`;

    return this.http.get<Hero[]>(url);
  }

  getHeroByID(id: number) {
    return this.http.get(`${this.baseUrl}/heroes/${id}`);
  }

  addHero(data: any) {
    this.http
      .post(`${this.baseUrl}/heroes`, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe(
        (val) => {
          console.log('PATCH call successful value returned in body', val);
        },
        (response) => {
          console.log('PATCH call in error', response);
        },
        () => {
          console.log('The PATCH observable is now completed.');
        }
      );
  }

  deleteHero(id: number) {
    const url = `${this.baseUrl}/heroes`;
    return this.http.delete(`${url}/${id}`).subscribe((val) => {
      console.log('PATCH call successful value returned in body', val);
    });
  }

  getSuperpowers() {
    return this.http.get(`${this.baseUrl}/superpowers`);
  }

  getSuperpowerByIDs(ids: number[]) {
    return this.http.get(
      `${this.baseUrl}/superpowers?${ids.map((id) => 'id=' + id).join('&')}`
    );
  }

  updateSuperpower(data: any, id: number) {
    const endPoint = `/heroes/${id}`;
    return this.http
      .patch(this.baseUrl + endPoint, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }
}
