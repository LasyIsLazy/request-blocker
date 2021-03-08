document.addEventListener('DOMContentLoaded', function (event) {
  var addItemBtn = document.getElementById('addItem');
  addItemBtn.onclick = addItem;
  document.getElementById('clearList').onclick = clearList;
});

const KEY = 'BLOCK_LIST';

async function addItem() {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(
  //       tabs[0].id,
  //       { action: 'checkForWord' },
  //       function (response) {
  //         console.log('response', response);
  //       }
  //     );
  //   });

  const input = document.getElementById('input');
  const value = input.value;
  if (!value) return;
  await pushList([value]);
  input.value = '';
}

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

function pushList(value) {
  if (!Array.isArray(value)) {
    value = [];
  }
  return getList().then(
    list =>
      new Promise(resolve => {
        list.push(...value);
        setList(list);
      })
  );
}

function setList(value) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [KEY]: value }, function () {
      console.log('newList ' + value);
      resolve();
    });
  });
}

function clearList() {
  return setList([]);
}
