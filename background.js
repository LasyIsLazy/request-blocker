console.log('background');
chrome.webRequest.onBeforeRequest.addListener(
  details => {
    console.log('onBeforeRequest', details);
    return getBlockResponse(details)
    // return {
    //   cancel: true,
    // };
  },
  { urls: ['http://*/*', 'https://*/*'] },
  ['blocking', 'extraHeaders', 'requestBody']
);

const getBlockResponse = (details) => {
    // https://developer.chrome.com/docs/extensions/reference/webRequest/#type-BlockingResponse
    return undefined
}