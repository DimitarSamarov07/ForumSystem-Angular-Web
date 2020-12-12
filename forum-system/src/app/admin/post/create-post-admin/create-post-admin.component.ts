import {Component, OnInit} from '@angular/core';
import tinymce from "tinymce";

@Component({
  selector: 'app-create-post-admin',
  templateUrl: './create-post-admin.component.html',
  styleUrls: ['./create-post-admin.component.css']
})
export class CreatePostAdminComponent implements OnInit {

  constructor() {
  }

  async ngOnInit() {
  }

  async initTinyMce() {
    await tinymce.init({
      selector: '#tinyTextArea',
      plugins: [
        "image paste table link code media"
      ]
    });
  }


}
