import {Injectable} from '@angular/core';
import {CloudinaryService} from "../../cloudinary.service";
import ICategory from "../../shared/interfaces/ICategory";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {
  constructor(private cloudinaryService: CloudinaryService, private http: HttpClient) {
  }

  async createNewCategory({title, description,}, image) {
    debugger;
    const imageUrl = await this.cloudinaryService.uploadCategoryImage(image);
    try {
      await Backendless.Data.of("categories").save({title, description, imageUrl});
    } catch (e) {
      console.log(e)
    }
  }

  async retrieveCategories(): Promise<ICategory[]> {
    const url = `https://api.backendless.com/${environment.backendless.APP_ID}/${environment.backendless.API_KEY}/data/Categories`
    return await this.http.get<ICategory[]>(url).toPromise()
  }
}
