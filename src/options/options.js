import { clearList, getList, pushList, setList, Signal } from '../common';
async function updatePageList() {
  const list = await getList();
  console.log('updatePageList', list);
  const getItemHTML = ({ url }) => `<li>${url}</li>`;
  document.getElementById('list').innerHTML = `
    <ul>
    ${list.map(getItemHTML).join('')}
    </ul>
  `;
}

function updateBackgroundList() {
  console.log('chrome.runtime', chrome.runtime)
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({signal: Signal.UpdateBackgroundList}, res => {
      if(!res)  return reject()
      resolve(res)
    })
  })
}

document.addEventListener('DOMContentLoaded', function (event) {
  updatePageList();
  var addItemBtn = document.getElementById('addItem');
  addItemBtn.onclick = async () => {
    const pathType = document.getElementById('pathType').value;
    const url = document.getElementById('input').value;
    if (!url) return;
    console.log(pathType, url);
    await pushList({ pathType, url });
    document.getElementById('input').value = '';
    await updateBackgroundList();
    await updatePageList();
  };
  document.getElementById('clearList').onclick = async () => {
    await clearList();
    await updatePageList();
  };
});
