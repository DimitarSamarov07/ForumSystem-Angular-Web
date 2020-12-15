import {Injectable} from '@angular/core';
import IPost from "../../shared/interfaces/IPost";

@Injectable({
  providedIn: 'root'
})
export class PostAdminService {

  private postStore = Backendless.Data.of("Posts");

  constructor() {
  }


  async retrievePostsFromCategory(categoryId) {
    const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(`category = '${categoryId}'`).setRelated("author").setRelated("category");

    return await this.postStore.find<IPost>(queryBuilder);
  }

  async createPost({title, content}, category, userId) {
    const newPost = await this.postStore.save({title, content});
    await this.postStore.setRelation(newPost, "author", [{objectId: userId}]);
    await this.postStore.setRelation(newPost, "category", [{objectId: category}])
  }

  async retrievePost(postId) {
    debugger;
    const loadRelation = await Backendless.LoadRelationsQueryBuilder.create().setRelationName("category");
    const post = await this.postStore.findById(postId);
    const category = await this.postStore.loadRelations<IPost>(postId, loadRelation)
    debugger;

    Object.assign(post, {category: category[0]})

    return post as IPost;
  }

  async deletePost(postId) {
    await this.postStore.remove({postId});
  }

  async editPost({title, content}, postId) {
    debugger;
    const post = await this.retrievePost(postId)
    Object.assign(post, {title, content});
    await this.postStore.save(post);
  }
}
