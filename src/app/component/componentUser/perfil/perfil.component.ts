import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/object/profile';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'src/app/object/avatar';
import { Color } from 'src/app/object/color';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public profile: Profile = new Profile(0,0,'', new Date(), '', false, '', new Color('', '', ''), new Avatar('', '', ''));
  profileForm: FormGroup;
  nameBefore: string = '';
  colorTable:Color[] = [];
  avatarTable:Avatar[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private profileService: ProfilesService) {
    //definición del form
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      active: new FormControl(),
      avatar: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    //recibimos le objeto del componente vatar-perfil-home
    const itemString = this.route.snapshot.paramMap.get('item');
    if (itemString) {
      this.profile = JSON.parse(itemString) as Profile;
      this.nameBefore = this.profile.name;
      //inicializacion del form con los datos del perfil
      this.patchFormValues();
    }
  }

  //
  patchFormValues(): void {
    if (this.profile) {
      this.profileForm.patchValue({
        name: this.profile.name,
        birthday: this.profile.birthday,
        gender: this.profile.gender,
        active: this.profile.active,
        avatar: this.profile.avatar,
        color: this.profile.color
      });
    }
  }

  //modificacion del perfil tras los cambios del usuario
  updateProfile(): void {

    /*----------------------------------------------*/
    if (this.profileForm.valid) {
      this.profile.name = this.profileForm.controls["name"].value;
      this.profile.birthday = this.profileForm.controls["birthday"].value;
      this.profile.gender = this.profileForm.controls["gender"].value;
      this.profile.active = this.profileForm.controls["active"].value;
      this.profile.avatar = this.profileForm.controls["avatar"].value;
      this.profile.color = this.profileForm.controls["color"].value;
    }
    //preparacion apr amandar ambos objetos
    const navigationExtras = {
      state: {
        profile: this.profile,
        nameBefore: this.nameBefore
      }
    };
    this.router.navigate(['/profileHome'], navigationExtras);
  }




}