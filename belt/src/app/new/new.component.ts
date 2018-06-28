import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  pet;
  duplicate = false;
  constructor(private _http: HttpService,private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.pet = {
      name: "",
      type: "",
      description: "",
      skillOne: "",
      skillTwo: "",
      skillThree: ""
    }
  }
  newPet(){
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
    let observable = this._http.newPet(this.pet)
    observable.subscribe(data => {
      console.log("newPet ran success", data)
      this.goHome()
    })
  }
  goHome(){
    this._router.navigate([''])
  }
}