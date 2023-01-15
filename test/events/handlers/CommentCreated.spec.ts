import EventBus from '@/events/EventBus';
import CommentCreated from '@/events/handlers/CommentCreated';

const mockedEventBus = EventBus as jest.Mocked<typeof EventBus>;

describe('Comment Created Event', () => {
	beforeEach(() => {
		EventBus.emit = jest.fn();
	});

	afterEach(jest.clearAllMocks);

	it('should has a compatible event name', () => {
		const event = CommentCreated;
		expect(event.event()).toBe('comment.created');
	});

	it('should not handle the incompatible event', async () => {
		const response = await CommentCreated.handle('any.kindofevent', {
			id: 'anycommentid',
			postId: 'anypostid',
			author: 'Bruce Wayne',
			content: 'I am Batman',
			status: 'pending',
		});

		expect(response).toBeFalsy();
		expect(mockedEventBus.emit).not.toHaveBeenCalled();
	});

	it('should handle the compatible event', async () => {
		const response = await CommentCreated.handle('comment.created', {
			id: 'anycommentid',
			postId: 'anypostid',
			author: 'Bruce Wayne',
			content: 'I am Batman',
			status: 'pending',
		});

		expect(response).toBe(true);
		expect(mockedEventBus.emit).toHaveBeenCalledWith(
			'comment.moderated',
			{
				id: 'anycommentid',
				postId: 'anypostid',
				author: 'Bruce Wayne',
				content: 'I am Batman',
				status: 'approved',
			}
		);
		expect(mockedEventBus.emit).toHaveBeenCalledTimes(1);
	});

	it('should refuse bad word on compatible event', async () => {
		const response = await CommentCreated.handle('comment.created', {
			id: 'anycommentid',
			postId: 'anypostid',
			author: 'Bruce Wayne',
			content: 'I am the damn Batman',
			status: 'pending',
		});

		expect(response).toBe(true);
		expect(mockedEventBus.emit).toHaveBeenCalledWith(
			'comment.moderated',
			{
				id: 'anycommentid',
				postId: 'anypostid',
				author: 'Bruce Wayne',
				content: 'I am the damn Batman',
				status: 'recused',
			}
		);
		expect(mockedEventBus.emit).toHaveBeenCalledTimes(1);
	});
});
