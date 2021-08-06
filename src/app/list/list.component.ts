import { Component, OnInit } from "@angular/core";
import { SpaceXService } from "../services/space-x.service";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private spaceXService: SpaceXService) {}

  launches = [];

  ngOnInit(): void {
    this.spaceXService.launches().subscribe((data: any) => {
      // TODO: sort by date
      this.launches = data;
    });
  }
}
