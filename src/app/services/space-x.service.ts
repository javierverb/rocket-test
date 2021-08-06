import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SpaceXService {
  BASE_URL = "https://api.spacexdata.com/v3";

  constructor(private http: HttpClient) {}

  launches() {
    const url = `${this.BASE_URL}/launches`;
    return this.http.get(url);
  }

  flightDetails(flight_number) {
    const url = `${this.BASE_URL}/launches`;
    return this.http.get(url);
  }
  rockets() {
    const url = `${this.BASE_URL}/rockets`;
    return this.http.get(url);
  }
}
