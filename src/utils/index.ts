const hasBadWords = (content: string) => {
	const badWords = ['damn', 'hell', 'crap', 'piss', 'fuck'];
	return new RegExp(badWords.join('|'), 'gi').test(content);
};

// eslint-disable-next-line import/prefer-default-export
export { hasBadWords };
