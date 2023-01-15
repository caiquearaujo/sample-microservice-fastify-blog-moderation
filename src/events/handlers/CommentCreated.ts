import { IEventHandler } from '@/types/classes';
import { hasBadWords } from '@/utils';
import EventBus from '../EventBus';

export interface ICommentRecord {
	id: string;
	postId: string;
	author: string;
	content: string;
	status: 'pending' | 'recused' | 'approved';
}

class CommentCreated implements IEventHandler<ICommentRecord> {
	protected name;

	constructor() {
		this.name = 'comment.created';
	}

	public event() {
		return this.name;
	}

	public async handle(event: string, payload: ICommentRecord) {
		if (event !== this.name) return false;

		EventBus.emit('comment.moderated', {
			...payload,
			status: hasBadWords(payload.content) ? 'recused' : 'approved',
		});

		return true;
	}
}

export default new CommentCreated();
