import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor() {
  }

  async uploadCategoryImage(imgFile) {
    const formData = new FormData();

    formData.append("file", imgFile);
    formData.append("upload_preset", "heiiwjpm")

    const {secure_url} = await fetch("http://api.cloudinary.com/v1_1/dse6krwlt/image/upload", {
      method: "POST",
      body: formData
    }).then(res => res.json());

    return secure_url;
  }
}
