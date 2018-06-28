import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet;
  id: number;
  disabled = false;
  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.pet = {
      name: "",
      type: "",
      description: "",
      skillOne: "",
      skillTwo: "",
      skillThree: ""
    }
    this.grabPet()
  }
  grabPet(){
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id']
    });
    let observable = this._http.showPet(this.id)
    observable.subscribe(data => {
      console.log("here's the one pet", data);
      this.pet = data['data']
      if(!this.pet.likes){
        this.pet.likes = 0;
      }
    })
  }
  Like(){
    this.pet.likes += 1;
    let observable = this._http.likePet(this.id, this.pet);
    observable.subscribe(data => {
      console.log("made it back from patch", data);
    })
    this.disabled = true
  }
  goHome(){
    this._router.navigate([''])
  }
  Adopt(){
    let observable = this._http.adoptPet(this.id);
    observable.subscribe(data => {
      console.log('you adopted',data);
      this.goHome()
    })
  }
}