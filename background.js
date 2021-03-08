console.log('background');
chrome.webRequest.onBeforeRequest.addListener(
  details => {
    console.log('onBeforeRequest', details);
    // return {
    //   cancel: true,
    // };
  },
  { urls: ['http://*/*', 'https://*/*'] },
  ['blocking', 'extraHeaders', 'requestBody']
);
