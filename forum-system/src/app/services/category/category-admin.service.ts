import {Injectable} from '@angular/core';
import {CloudinaryService} from "../shared/cloudinary.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CategoryService} from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService extends CategoryService {

  constructor(cloudinaryService: CloudinaryService,
              http: HttpClient,
              router: Router) {
    super(cloudinaryService, http, router);
  }

  async createNewCategory({title, description,}, image) {
    const imageUrl = await this.cloudinaryService.uploadCategoryImage(image);
    try {
      await this.categoryStore.save({title, description, imageUrl});
    } catch (e) {
      console.log(e)
    }
  }

  async deleteCategoryById(objectId) {
    try {
      await Backendless.Data.of("Categories").remove({objectId});
    } catch (e) {
      await this.router.navigateByUrl("/administration/category/list");
    }
  }

  async editCategoryById(id: string, data, imgFile?) {
    if (imgFile) {
      data.imageUrl = await this.cloudinaryService.uploadCategoryImage(imgFile);
    }
    const category = await this.categoryStore.findById(id);
    Object.assign(category, data); //overwrite data

    await this.categoryStore.save(category);
  }
}
