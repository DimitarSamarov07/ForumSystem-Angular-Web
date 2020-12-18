import {Component, OnInit} from '@angular/core';
import {ReplyService} from "../../../../services/reply/reply.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit {

  postId: string;

  constructor(private replyService: ReplyService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
    this.postId = activatedRoute.snapshot.params.postId;
  }

  ngOnInit(): void {
  }

}
