import { FileService } from '../../core/file.service';
import { UserModule } from 'src/app/models/user/user.module';
import { UserService } from './../../core/user.service';
import { Component, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Address } from 'src/app/models/server-user/server-user.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  photoRout = environment.API_URL+"load/image/";
  user:UserModule;
  reader = new FileReader();
  updatedUser:UserModule;
  selectedFile = null;
  profileImage = null;
  constructor(private userService:UserService,
              private fileService:FileService) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user =>{ 
      this.user = user;
      this.updatedUser = JSON.parse(JSON.stringify(this.user));
      if(!this.updatedUser.address) this.updatedUser.address = new Address();
    });

    if(!this.updatedUser.photo){
      this.profileImage = "../assets/images/profile-avatar.jpg" 
    }else{
      this.profileImage = this.photoRout+this.updatedUser.photo;
    }
  }

  onSubmit(){
    console.log('salam',this.updatedUser)
    Swal.fire({
      title: 'vous étes sûr?',
      text: "Voulez vous vraiment modifié votre profil!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier-le!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })
        this.userService.updateUser(this.updatedUser).subscribe(
          res => {
            this.updatedUser = res;
            Swal.fire(
              'Profil mis à jour!',
              '',
              'success'
            )
          }
        )
        
      }
    })
  }
  

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  uploadImage(){
    Swal.fire({
      title: 'vous étes sûr?',
      text: "Voulez vous vraiment modifié votre photo de profil!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier-le!'
    }).then((result) => {
      if (result.value) {
       
        this.fileService.uploadImage(this.selectedFile).subscribe(
         () => {
            Swal.fire(
              'Photo mis à jour!',
              '',
              'success'
            )
          }
        )
        
      }
    })
  }

  loadImage(){
    this.fileService.loadImage().subscribe(
      event => console.log(event)
    )
  }

  imageShow(imageuser){
    console.log(imageuser.value)
  }

  changeDate($event){
    console.log($event);
  }

  fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      let _this = this;
      reader.onload = function (e : any) {
        _this.profileImage =  e.target.result;
        
      }   
      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

}
