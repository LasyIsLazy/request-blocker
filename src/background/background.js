console.log('background');

import { getList, Signal } from '../common';

function messageListener(
    request,
    sender,
    sendResponse
  ) {
    console.log('message', request);
    const handler = async () => {

      const { signal } = request;
      if (signal === Signal.UpdateBackgroundList) {
        await updateList();
        sendResponse({ farewell: 'goodbye' });
      }
    }
    handler()
    // IMPORTANT! Do not delete
    return true
  }

let list = [];
async function updateList() {
  list = await getList();
  console.log('Update background list done.')
}

async function background() {
  const getBlockResponse = ({ url }) => {
    // https://developer.chrome.com/docs/extensions/reference/webRequest/#type-BlockingResponse
    //   console.log('list', list);
    if (list.findIndex(item => item.url === url) !== -1) {
      console.log('block', url);
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
