import { clearList, getList, pushList, setList } from '../common';
async function updatePageList() {
  const list = await getList();
  console.log('updatePageList', list);
  const getItemHTML = ({url}) => `<li>${url}</li>`
  document.getElementById('list').innerHTML = `
    <ul>
    ${list.map(getItemHTML).join('')}
    </ul>
  `;
}

document.addEventListener('DOMContentLoaded', function (event) {
  updatePageList();
  var addItemBtn = document.getElementById('addItem');
  addItemBtn.onclick = async () => {
      const pathType = document.getElementById('pathType').value
    const url = document.getElementById('input').value;
    if (!url) return;
    console.log(pathType, url)
    await pushList({pathType, url});
    document.getElementById('input').value = '';
    await updatePageList();
  };
  document.getElementById('clearList').onclick = async () => {
    await clearList();
    await updatePageList();
  };
});
