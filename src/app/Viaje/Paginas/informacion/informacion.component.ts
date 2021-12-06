import { Component, OnInit } from '@angular/core';
import { Personal } from '../../personaInterface';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  arrayPasajero:any[] =[];

  constructor( private service : ServiceService) { 

    this.service.getPeoples().subscribe(elementos =>{
      this.arrayPasajero = [];
      elementos.forEach( (ele:any)=>{
       
          this.arrayPasajero.push({
            idd : ele.payload.doc.id,
            ...ele.payload.doc.data()
          })
      })
      
    });
  }

  ngOnInit(): void {
  }

  
  editar(people : any){
    let edit = true
    this.service.sendPeople(people);
    console.log(edit)
   this.service.sendOpenF(edit);
  }


  eliminar(id : string){
    this.service.deletePeople(id).then(()=>{
      Swal.fire('Eliminaste un pasajero')
     },error=>{
       console.log(error+"error al eliminar")
     })
  }
}
