import {Injectable} from '@angular/core';
import IPost from "../../shared/interfaces/IPost";
import ICategoryDetailsList from "../../shared/interfaces/ICategoryDetailsList";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postStore = Backendless.Data.of("Posts");
  private categoryStore = Backendless.Data.of("Categories");
  private replyStore = Backendless.Data.of("Replies")

  constructor() {
  }


  async retrievePostsFromCategory(categoryId) {
    const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(`category = '${categoryId}'`)
      .setRelated(["author", "category"])

    return await this.postStore.find<IPost>(queryBuilder);
  }

  async getAllPosts(): Promise<IPost[]> {
    return await this.postStore.find<IPost>({});
  }

  async getLatestNPosts(n: number): Promise<IPost[]> {
    const query = Backendless.DataQueryBuilder.create().setPageSize(n).setRelated("author");
    const posts = await this.postStore.find<IPost>(query);

    for (const post of posts) {
      post.repliesCount = await this.getPostRepliesCount(post.objectId);
    }

    return posts.sort((a, b) => (new Date(b.created)).getTime() - (new Date(a.created)).getTime())
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
    const posts = await this.postStore.find<IPost>(queryBuilder);

    for (const post of posts) {
      post.repliesCount = await this.getPostRepliesCount(post.objectId)
    }

    return {...category, posts} as ICategoryDetailsList;
  }

  async createPost({title, content}, category, userId) {
    const newPost = await this.postStore.save<IPost>({title, content});
    await this.postStore.setRelation(newPost, "author", [{objectId: userId}]);
    await this.postStore.setRelation(newPost, "category", [{objectId: category}])
    return newPost.objectId;
  }

  async getPostRepliesCount(postId) {
    const replyClause = `post = '${postId}'`
    const replyQuery = Backendless.DataQueryBuilder.create().setWhereClause(replyClause);

    return this.replyStore.getObjectCount(replyQuery);
  }

  async retrievePost(postId) {
    const query = await Backendless.DataQueryBuilder.create().setRelated(["author", "category"]);
    return await this.postStore.findById<IPost>(postId, query);
  }

  async retrievePostWithReplies(postId) {
    const post = await this.retrievePost(postId);

    const clause = `post = '${postId}'`;
    const query = Backendless.DataQueryBuilder.create().setWhereClause(clause).setRelated("author");

    post.replies = await this.replyStore.find(query);
    post.replies.forEach(x => x.parsedCreated = moment(x.created).format("DD/MM/YYYY hh:mm:ss"))

    return post;
  }

  async deletePost(postId) {
    await this.postStore.remove({objectId: postId});
  }

  async editPost({title, content}, postId) {
    const post = await this.retrievePost(postId)
    Object.assign(post, {title, content});
    await this.postStore.save(post);
  }

  async editPostContent(content, postId) {
    const post = await this.retrievePost(postId);
    Object.assign(post, {content});
    await this.postStore.save(post)
  }


  async getNMostPopularPosts(n: number) {
    const postQuery = Backendless.DataQueryBuilder.create().setRelated("author")

    const posts = await this.postStore.find<IPost>(postQuery)

    for (const post of posts) {
      post.repliesCount = await this.getPostRepliesCount(post.objectId);
    }

    return posts.sort((a, b) => b.repliesCount - a.repliesCount).slice(0, n)
  }

  private static async calculateOffset(page, objPerPage) {
    // const queryBuilder = Backendless.DataQueryBuilder.create().setOffset(offset).setPageSize(objPerPage);
    return objPerPage * page;
  }
}
