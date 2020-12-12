import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import IPost from "../../shared/interfaces/IPost";

@Injectable({
  providedIn: 'root'
})
export class PostAdminService {


  private baseCategoriesUrl = `https://api.backendless.com/${environment.backendless.APP_ID}/${environment.backendless.API_KEY}/data/Categories`;
  private basePostsUrl = `https://api.backendless.com/${environment.backendless.APP_ID}/${environment.backendless.API_KEY}/data/Posts`;

  private categoryStore = Backendless.Data.of("Categories");
  private postStore = Backendless.Data.of("Posts");

  constructor(private http: HttpClient,
              private router: Router) {
  }


  async retrievePostsFromCategory(categoryId) {
    const loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create().setRelationName('posts');

    return await this.categoryStore.loadRelations<IPost>(categoryId, loadRelationsQueryBuilder)
  }

  async createPost({title, content, authorId}) { // get only the needed data
    await this.postStore.save({title, content, authorId});
  }

}
