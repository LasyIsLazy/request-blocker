const KEY = 'BLOCK_LIST';

export function getList() {
  return new Promise(resolve => {
    chrome.storage.local.get([KEY], function (result) {
      const list = result[KEY];
      if (!Array.isArray(list)) {
        resolve([]);
        return;
      }
      resolve(list);
    });
  });
}

export function pushList(value) {
  return getList().then(list => {
    list.push(value);
    return setList(list);
  });
}

export function setList(value) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [KEY]: value }, function () {
      console.log('newList ' + value);
      resolve();
    });
  });
}

export function clearList() {
  return setList([]);
}

export const Signal = {
    UpdateBackgroundList: 'UpdateBackgroundList'
}