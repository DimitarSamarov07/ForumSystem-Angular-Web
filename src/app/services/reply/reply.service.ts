import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  private replyStore = Backendless.Data.of("Replies");

  constructor() {
  }

  createReply(postId, replyContent) {

  }
}
