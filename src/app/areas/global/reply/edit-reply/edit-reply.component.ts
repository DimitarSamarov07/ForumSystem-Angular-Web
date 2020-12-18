import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReplyService} from "../../../../services/reply/reply.service";
import {ActivatedRoute, Router} from "@angular/router";
import IReply from "../../../../shared/interfaces/IReply";

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.css']
})
export class EditReplyComponent implements OnInit {

  form: FormGroup;
  reply: IReply
  replyId: string;
  loadSpinner = true;
  btnLoadSpinner = false;

  constructor(private replyService: ReplyService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.replyId = this.activatedRoute.snapshot.params.replyId;
  }

  async ngOnInit() {
    this.reply = await this.replyService.getReplyById(this.replyId);
    this.form = this.fb.group({
      content: [this.reply.content, [Validators.minLength(20), Validators.maxLength(1000)]],
    })

    this.loadSpinner = false;
  }

  async onFormSubmit(formData) {
    if (formData.valid) {
      this.btnLoadSpinner = true;
      await this.replyService.editReply(this.replyId, formData.value.content);
      await this.router.navigateByUrl("/post/details/" + this.reply.post.objectId)
    }
  }
}
