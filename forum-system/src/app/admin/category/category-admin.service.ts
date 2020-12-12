import {Injectable} from '@angular/core';
import {CloudinaryService} from "../../cloudinary.service";
import ICategory from "../../shared/interfaces/ICategory";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {
  private baseCategoriesUrl = `https://api.backendless.com/${environment.backendless.APP_ID}/${environment.backendless.API_KEY}/data/Categories`;
  private categoryStore = Backendless.Data.of("Categories");

  constructor(private cloudinaryService: CloudinaryService,
              private http: HttpClient,
              private router: Router) {
  }

  async createNewCategory({title, description,}, image) {
    const imageUrl = await this.cloudinaryService.uploadCategoryImage(image);
    try {
      await this.categoryStore.save({title, description, imageUrl});
    } catch (e) {
      console.log(e)
    }
  }

  async retrieveCategories(): Promise<ICategory[]> {
    const url = this.baseCategoriesUrl;
    return await this.http.get<ICategory[]>(url).toPromise()
  }

  async retrieveCategoryById(categoryId): Promise<ICategory> {
    const url = `${this.baseCategoriesUrl}/${categoryId}`;

    try {
      return await this.http.get<ICategory>(url).toPromise()
    } catch (e) {
      await this.router.navigateByUrl("/administration/category/list");
    }
  }

  public trackItem(index: number, item: ICategory) {
    return item.objectId;
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
