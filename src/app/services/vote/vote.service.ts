import {Injectable} from '@angular/core';
import IVote from "../../shared/interfaces/IVote";
import IUser from "../../shared/interfaces/IUser";
import {PostService} from "../post/post.service";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private voteStore = Backendless.Data.of("Votes");
  private userStore = Backendless.Data.of("Users")

  constructor(private postService: PostService) {
  }

  async registerVote(postId, userId, polarity: boolean) {
    const voteObjInDB = await this.checkUserVote(userId, postId);
    const post = await this.postService.retrievePost(postId)
    const authorId = post.author.objectId;

    if (voteObjInDB.length > 0) {
      return await this.changeVote(voteObjInDB[0], polarity, authorId)
    }

    const vote = await this.voteStore.save({polarity: polarity});
    await this.voteStore.setRelation(vote, "user", [{objectId: userId}]);
    await this.voteStore.setRelation(vote, "post", [{objectId: postId}])

    const user = await this.userStore.findById<IUser>(authorId);
    const interpret = polarity ? 1 : -1;
    user.karmaPoints += interpret;

    await this.userStore.save(user);
  }

  async changeVote(voteObj, newPolarity, authorId) {
    voteObj.polarity = newPolarity;
    await this.voteStore.save(voteObj);

    const user = await this.userStore.findById<IUser>(authorId);
    const interpret = newPolarity ? 2 : -2;
    user.karmaPoints += interpret;

    await this.userStore.save(user);
  }

  async checkUserVote(userId, postId) {
    const clause = `user = '${userId}' and post = '${postId}'`
    const query = Backendless.DataQueryBuilder.create().setWhereClause(clause).setRelated(["post", "user"]);

    return await this.voteStore.find(query);
  }

  async getPostVotesCount(postId) {
    const clause = `post = '${postId}'`
    const query = Backendless.DataQueryBuilder.create().setWhereClause(clause)

    const votes = await this.voteStore.find<IVote>(query);

    return votes.reduce((acc, curr) => {
      const interpret = curr.polarity ? 1 : -1;

      return acc += interpret;
    }, 0)
  }

}
