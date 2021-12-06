import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personal } from '../personaInterface';
import { ServiceService } from '../service.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent  {

  miFormulario : FormGroup = this.fb.group({
    nombre: ['',[Validators.required , Validators.minLength(2)]],
    email: ['',[Validators.required , Validators.email , Validators.minLength(2)]],
    paisDestino: ['',[Validators.required  , Validators.minLength(2)]],
  })

  id! : string;

  constructor(private fb : FormBuilder, private service : ServiceService) {

      this.service.returnOpenForm().subscribe(elementos=>{
        this.registerPassenger = elementos;
      })

      
      this.service.returnPeopleForEdit().subscribe(elementos=>{
        console.log(elementos)
          this.id = elementos.idd;
         this.miFormulario.setValue({
          nombre: elementos.nombre,
          email : elementos.email,
          paisDestino : elementos.paisDestino
        })
      })
   }
   

  registerPassenger! : boolean ;
 
  openForm(){
  this.registerPassenger = !this.registerPassenger;
    
  }

  send(){
 
    if(this.id === undefined){
      this.agregar();
    }
    else{
      this.edit();
    }

  }

  agregar(){
    const PERSON : Personal ={
      id : 1,
      nombre : this.miFormulario.value.nombre,
      email : this.miFormulario.value.email,
      paisDestino : this.miFormulario.value.paisDestino,
    }

    this.service.createPeople(PERSON).then(()=>{
      Swal.fire('Agregaste un pasajero')
      this.miFormulario.reset();
    })
  }

  edit(){
   
    const PERSON : Personal ={
      id : 1,
      nombre : this.miFormulario.value.nombre,
      email : this.miFormulario.value.email,
      paisDestino : this.miFormulario.value.paisDestino,
    }
   
    this.service.editPeople(this.id , PERSON).then(()=>{
      Swal.fire('Actualizaste un pasajero')
      this.miFormulario.reset();

      this.registerPassenger=false;
    })

  }


  
}
