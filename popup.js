document.addEventListener('DOMContentLoaded', function(event) {
  var addItemBtn = document.getElementById('addItem');
  addItemBtn.onclick = addItem;
});

function addItem() {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'checkForWord' },
        function (response) {
          console.log('response', response)
        }
      );
    }
  );
}

