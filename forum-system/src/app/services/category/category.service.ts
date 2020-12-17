import {Injectable} from '@angular/core';
import ICategory from "../../shared/interfaces/ICategory";
import {environment} from "../../../environments/environment";
import {CloudinaryService} from "../shared/cloudinary.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  protected baseCategoriesUrl = `https://api.backendless.com/${environment.backendless.APP_ID}/${environment.backendless.API_KEY}/data/Categories`;
  protected categoryStore = Backendless.Data.of("Categories");

  constructor(protected cloudinaryService: CloudinaryService,
              protected http: HttpClient,
              protected router: Router) {
  }

  async retrieveCategories(): Promise<ICategory[]> {
    const url = this.baseCategoriesUrl;
    return await this.http.get<ICategory[]>(url).toPromise()
  }

  async getNCategories(n): Promise<ICategory[]> {
    const query = Backendless.DataQueryBuilder.create().setPageSize(n);
    const result = await this.categoryStore.find<ICategory>(query);

    const recentPostReferenceDate = moment().add(-24, "hours");
    result.forEach((x) => x.isRecentCategory = moment(x.created).toDate() > recentPostReferenceDate.toDate());

    return result;
  }

  async retrievePaginatedCategories(page?, itemsPerPage?): Promise<ICategory[]> {
    return await this.getPaginatorData(page, itemsPerPage);
  }

  async getCategoriesCount() {
    return await this.categoryStore.getObjectCount();
  }

  async retrieveCategoryById(categoryId): Promise<ICategory> {
    const url = `${this.baseCategoriesUrl}/${categoryId}`;

    try {
      return await this.http.get<ICategory>(url).toPromise()
    } catch (e) {
      await this.router.navigateByUrl("/administration/category/list");
    }
  }

  private async getPaginatorData(currPage, objPerPage): Promise<ICategory[]> {
    debugger;
    const offset = objPerPage * (currPage - 1);

    const queryBuilder = Backendless.DataQueryBuilder.create().setOffset(offset).setPageSize(objPerPage);

    const recentPostReferenceDate = moment().add(-24, "hours");
    const result = await this.categoryStore.find<ICategory>(queryBuilder);
    result.forEach((x) => x.isRecentCategory = moment(x.created).toDate() > recentPostReferenceDate.toDate())

    return result;

  }
}
