import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet;
  id: number;
  duplicate = false;
  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.grabPet()
  }
  grabPet(){
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id']
    })
    let observable = this._http.showPet(this.id)
    observable.subscribe(data => {
      this.pet = data['data'];
      console.log("this.pet", this.pet);
    })
  }
  editPet(){
    let UniqueObservable = this._http.getPet()
    UniqueObservable.subscribe(data => {
      console.log('pet data', data);
      for(var i = 0; i<data['data'].length; i++){
        if(this.pet.name == data['data'][i].name){
          this.duplicate = true;
          return
        }
        else {
          this.duplicate = false;
        }
      }
    })
    let observable = this._http.likePet(this.id, this.pet);
    observable.subscribe(data => {
      console.log("changed the pet", data)
      this.goHome()
    })
  }
  goHome(){
    this._router.navigate([''])
  }
}