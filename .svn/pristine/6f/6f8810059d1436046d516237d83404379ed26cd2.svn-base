export const extractQueryParameter = (url, parameterName) => {
	const regex = new RegExp(`[?&]${parameterName}=([^&]+)`);
	const match = url.match(regex);
	return match ? match[1] : null;
};
