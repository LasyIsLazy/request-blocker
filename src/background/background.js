console.log('background');

const KEY = 'BLOCK_LIST';
function getList() {
  return new Promise(resolve => {
    chrome.storage.local.get([KEY], function (result) {
      const list = result[KEY];
      if (!Array.isArray(list)) {
        return resolve([]);
      }
      resolve(list);
    });
  });
}

async function background() {
  const list = await getList();
  chrome.webRequest.onBeforeRequest.addListener(
    details => {
      console.log('onBeforeRequest', details);
      return getBlockResponse(details);
    },
    { urls: ['http://*/*', 'https://*/*'] },
    ['blocking', 'extraHeaders', 'requestBody']
  );

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
}

background();
