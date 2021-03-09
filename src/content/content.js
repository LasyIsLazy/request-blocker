// // listen for checkForWord request, call getTags which includes callback to sendResponse
// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.action === 'checkForWord') {
//       console.log('checkForWord', checkForWord)
//       // this is required to use sendResponse asynchronously
//       return true;
//     }
//   }
// );

