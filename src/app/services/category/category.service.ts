import {Injectable} from '@angular/core';
import ICategory from "../../shared/interfaces/ICategory";
import {environment} from "../../../environments/environment";
import {CloudinaryService} from "../shared/cloudinary.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as moment from 'moment';
import IFullCategoryListing from "../../shared/interfaces/IFullCategoryListing";
import {PostService} from "../post/post.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  protected baseCategoriesUrl = `https://api.backendless.com/${environment.backendless.APP_ID}/${environment.backendless.API_KEY}/data/Categories`;
  protected categoryStore = Backendless.Data.of("Categories");

  constructor(protected cloudinaryService: CloudinaryService,
              protected http: HttpClient,
              protected router: Router,
              protected postService: PostService) {
  }

  async retrieveCategories(): Promise<ICategory[]> {
    const url = this.baseCategoriesUrl;
    return await this.http.get<ICategory[]>(url).toPromise()
  }


  async getNCategoriesWithFullData(n): Promise<ICategory[]> {
    const query = Backendless.DataQueryBuilder.create().setPageSize(n);
    let result = await this.categoryStore.find<ICategory>(query);

    const recentPostReferenceDate = moment().add(-24, "hours");
    result.forEach((x) => x.isRecentCategory = moment(x.created).toDate() > recentPostReferenceDate.toDate());
    result = await this.populateCategoryUserAndPostData(result)

    return result;
  }

  async retrieveCategoriesWithUserAndPostCounts() {
    let categories = await this.categoryStore.find<IFullCategoryListing>({});
    categories = await this.populateCategoryUserAndPostData(categories)

    return categories;
  }

  async retrievePaginatedCategories(page?, itemsPerPage?): Promise<IFullCategoryListing[]> {
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

  private async getPaginatorData(currPage, objPerPage): Promise<IFullCategoryListing[]> {
    const offset = objPerPage * (currPage - 1);

    const queryBuilder = Backendless.DataQueryBuilder.create().setOffset(offset).setPageSize(objPerPage);

    const recentPostReferenceDate = moment().add(-24, "hours");
    let result = await this.categoryStore.find<IFullCategoryListing>(queryBuilder);
    result = await this.populateCategoryUserAndPostData(result);
    result.forEach((x) => x.isRecentCategory = moment(x.created).toDate() > recentPostReferenceDate.toDate())


    return result;

  }

  private async populateCategoryUserAndPostData(categories) {

    for (const category of categories) {
      category.posts = await this.postService.retrievePostsFromCategory(category.objectId);
      if (category.posts.length > 0) {
        const authors = category.posts.map(x => x.author.objectId);
        const distinct = [...new Set(authors)]
        category.usersCount = distinct.length;
        category.postsCount = category.posts.length
      } else {
        category.usersCount = 0;
        category.postsCount = 0;
      }
    }

    return categories;
  }
}
