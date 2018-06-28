import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  newPet(pet){
    console.log("hit pet creation service", pet);
    return this._http.post('/api/newPet/',pet);
  }
  getPet(){
    console.log("hit get pet");
    return this._http.get('/api/getPet/')
  }
  showPet(id){
    console.log("hit pet show route");
    return this._http.get(`/api/getPet/${id}`)
  }
  likePet(id,like){
    console.log("liked the pet");
    return this._http.put(`/api/likePet/${id}`,like)
  }
  adoptPet(id){
    console.log("adopting pet");
    return this._http.delete(`/api/adoptPet/${id}`)
  }
}