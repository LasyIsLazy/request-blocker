const KEY = 'BLOCK_LIST';

async function updatePageList() {
  const list = await getList();
  console.log('updatePageList', list);
  document.getElementById('list').innerHTML = list.join('<br/>');
}

function getList() {
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

function pushList(value) {
  if (!Array.isArray(value)) {
    value = [];
  }
  return getList().then(list => {
    list.push(...value);
    return setList(list);
  });
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

document.addEventListener('DOMContentLoaded', function (event) {
  updatePageList();
  var addItemBtn = document.getElementById('addItem');
  addItemBtn.onclick = async () => {
    const input = document.getElementById('input');
    const value = input.value;
    if (!value) return;
    await pushList([value]);
    document.getElementById('input').value = '';
    await updatePageList();
  };
  document.getElementById('clearList').onclick = async () => {
    await clearList();
    await updatePageList();
  };
});
