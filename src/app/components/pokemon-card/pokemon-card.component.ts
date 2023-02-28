import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PokemonCatalogueService} from "../../services/pokemon-catalogue.service";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit{
  @Input() data:any;
  title:string="";
  private url:string='';
  imgUrl:string="";

  constructor(private catalogService:PokemonCatalogueService) {
  }

  ngOnInit(): void {
    this.title=this.data["name"]
    this.url=this.data["url"]
    this.imgUrl=this.catalogService.getIdAndImage(this.url)["image"]
    console.log(this.catalogService.getDetails(this.url))
  }





}
