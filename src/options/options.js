import { clearList, getList, pushList, setList, Signal } from '../common';
async function updatePageList() {
  const list = await getList();
  console.log('updatePageList', list);
  const getItemHTML = ({ pattern, pathType }) => `<li>${pathType} ${pattern}</li>`;
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
    const pattern = document.getElementById('input').value;
    if (!pattern) return;
    console.log(pathType, pattern);
    await pushList({ pathType, pattern });
    document.getElementById('input').value = '';
    await updateBackgroundList();
    await updatePageList();
  };
  document.getElementById('clearList').onclick = async () => {
    await clearList();
    await updateBackgroundList();
    await updatePageList();
  };
});
