import { hasBadWords } from '@/utils';

describe('Util functions', () => {
	it.each([
		{ content: 'I am Batman', status: false },
		{ content: 'I am a bad guy', status: false },
		{ content: 'I am a bad guy, damn', status: true },
		{ content: 'I am a bad guy, hell', status: true },
		{ content: 'I am a bad guy, crap', status: true },
		{ content: 'I am a bad guy, piss', status: true },
		{ content: 'I am a bad guy, fuck', status: true },
	])(
		`status should be $status when content is $content`,
		({ content, status }) => {
			expect(hasBadWords(content)).toBe(status);
		}
	);
});
