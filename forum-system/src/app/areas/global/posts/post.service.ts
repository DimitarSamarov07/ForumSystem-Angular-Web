import {Injectable} from '@angular/core';
import IPost from "../../../shared/interfaces/IPost";
import ICategoryDetailsList from "../../../shared/interfaces/ICategoryDetailsList";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postStore = Backendless.Data.of("Posts");
  private categoryStore = Backendless.Data.of("Categories");

  constructor() {
  }


  async retrievePostsFromCategory(categoryId) {
    const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(`category = '${categoryId}'`).setRelated("author").setRelated("category");

    return await this.postStore.find<IPost>(queryBuilder);
  }

  async getCountOfCategoryPosts(categoryId) {
    const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(`category = '${categoryId}'`);
    return await this.postStore.getObjectCount(queryBuilder)
  }

  async paginatePostsFromCategory(categoryId, page, objPerPage): Promise<ICategoryDetailsList> {
    const offset = await PostService.calculateOffset(page, objPerPage);
    const queryBuilder = Backendless.DataQueryBuilder
      .create()
      .setWhereClause(`category = '${categoryId}'`)
      .setRelated("author")
      .setOffset(offset)
      .setPageSize(objPerPage);

    const category = await this.categoryStore.findById(categoryId);
    const posts = await this.postStore.find(queryBuilder);

    return {...category, posts} as ICategoryDetailsList;
  }

  async createPost({title, content}, category, userId) {
    const newPost = await this.postStore.save({title, content});
    await this.postStore.setRelation(newPost, "author", [{objectId: userId}]);
    await this.postStore.setRelation(newPost, "category", [{objectId: category}])
  }

  async retrievePost(postId) {
    const loadRelation = await Backendless.LoadRelationsQueryBuilder.create().setRelationName("category");
    const post = await this.postStore.findById(postId);
    const category = await this.postStore.loadRelations<IPost>(postId, loadRelation)

    Object.assign(post, {category: category[0]})

    return post as IPost;
  }

  async deletePost(postId) {
    await this.postStore.remove({postId});
  }

  async editPost({title, content}, postId) {
    const post = await this.retrievePost(postId)
    Object.assign(post, {title, content});
    await this.postStore.save(post);
  }

  private static async calculateOffset(page, objPerPage) {
    // const queryBuilder = Backendless.DataQueryBuilder.create().setOffset(offset).setPageSize(objPerPage);
    return objPerPage * page;
  }
}
