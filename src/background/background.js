console.log('background');

import { getList, Signal } from '../common';

function messageListener(request, sender, sendResponse) {
  console.log('message', request);
  const handler = async () => {
    const { signal } = request;
    if (signal === Signal.UpdateBackgroundList) {
      await updateList();
      sendResponse({});
    }
  };
  handler();
  // IMPORTANT! Do not delete
  return true;
}

let list = [];
async function updateList() {
  list = await getList();
  console.log('Update background list done.');
}

async function background() {
  const getBlockResponse = detail => {
    const requestUrl = detail.url;
    // https://developer.chrome.com/docs/extensions/reference/webRequest/#type-BlockingResponse
    const shouldBlock =
      list.findIndex(({ pathType, url }) => {
        switch (pathType) {
          case 'glob':
            console.log('glob');
            // TODO: glob
            return url === requestUrl;

          case 'regex':
            console.log('regex');
            return new RegExp(url).exec(requestUrl);

          default:
            break;
        }
        return false;
      }) !== -1;
    if (shouldBlock) {
      console.log('block', requestUrl);
      return {
        cancel: true,
      };
    }
    return undefined;
  };
  await updateList();
  chrome.webRequest.onBeforeRequest.addListener(
    details => {
      console.log('onBeforeRequest', details);
      return getBlockResponse(details);
    },
    { urls: ['http://*/*', 'https://*/*'] },
    ['blocking', 'extraHeaders', 'requestBody']
  );

  console.log('chrome.runtime', chrome.runtime);

  chrome.runtime.onMessage.addListener(messageListener);
}

background();
