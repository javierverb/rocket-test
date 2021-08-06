import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SpaceXService } from "../services/space-x.service";
import { LocalStorageService } from "../services/local-storage.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  constructor(
    private spaceXService: SpaceXService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  private _rocketDetail: any;
  private _lauchesDetail: any;
  combinendObject: any; // the result of combination between _rocketDetail and _lauchesDetail

  retrieveRocketsById(rocketId) {
    this.spaceXService.rockets().subscribe((data: any[]) => {
      this._rocketDetail = data
        .filter((item) => item.rocket_id == rocketId)
        .pop(); // assuming that this returns a list with a single value
      this.combineObjects(this._lauchesDetail, this._rocketDetail);
    });
  }

  like(flightNumber) {
    const FAVOURITES = "FAVOURITES";
    const favourites = this.localStorage.get(FAVOURITES) || [];
    if (!this.isFav(flightNumber)) {
      favourites.push(flightNumber);
      this.localStorage.set(FAVOURITES, favourites);
      console.log("added:", this.localStorage.get(FAVOURITES));
    }
  }

  isFav(flightNumber) {
    const FAVOURITES = "FAVOURITES";
    const isIn = this.localStorage.isIn(FAVOURITES, flightNumber);
    console.log(isIn);
    return isIn;
  }

  combineObjects(launch, rocket) {
    /*
    Giving two objects, one from launches, other from rockets, returns a combined object with this format:
      {
        flight_number: 39,
        mission_name: "NROL-76",
        launch_date_unix: 1493637300,
        description:
        rocket: {
          rocket_id: "falcon1",
          rocket_name: "Falcon 1",
          active: true,
          cost_per_launch: 6700000,
          company: "SpaceX"
        },
      }
    */
    this.combinendObject = {
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      launch_date_unix: launch.launch_date_unix,
      rocket: {
        rocket_id: rocket.rocket_id,
        rocket_name: rocket.rocket_name,
        cost_per_launch: rocket.cost_per_launch,
        company: rocket.company,
      },
    };
  }

  ngOnInit(): void {
    console.log("Favs:", this.localStorage.get("FAVOURITES"));
    const rocketId = this.route.snapshot.paramMap.get("id");
    const flightNumber = this.route.snapshot.paramMap.get("flight_number");
    this.spaceXService.launches().subscribe((data: any[]) => {
      this._lauchesDetail = data
        .filter(
          (item) =>
            item.rocket.rocket_id == rocketId &&
            item.flight_number == flightNumber
        )
        .pop(); // assuming that this returns a list with a single value
      this.retrieveRocketsById(rocketId);
    });
  }
}
