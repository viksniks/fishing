import { Component, OnInit } from '@angular/core';
import {Router}  from  "@angular/router";
import {CallingService}  from "../api/calling.service"

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  providers:[CallingService]
})
export class IntroPage implements OnInit {

  constructor(private service:CallingService,private router:Router) { }

  ngOnInit() {
  }

  goto(url,colname)
  {
    this.router.navigate([url]).then(()=>{
         
    this.service.insertColName(colname);   
    })

  }

  

}
