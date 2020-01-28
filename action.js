document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById('toggle');
  var status = document.getElementById('status');

  chrome.storage.sync.get('hide', function(d) {
    var value = d.hide;
    status.innerText = !value ? 'active' : 'inactive';
  });

  toggleButton.onclick = function() {
    // get the current value
    chrome.storage.sync.get('hide', function(data) {
      var shouldToggle = data.hide;

      // set the value for the new storage
      chrome.storage.sync.set({ hide: !shouldToggle }, function() {
        // set the item to its new value
        status.innerText = !shouldToggle ? 'active' : 'inactive';

        if (shouldToggle) {
        chrome.tabs.getSelected(null, function(tab) {
          chrome.tabs.sendMessage(tab.id, { command: 'init', hide: shouldToggle }, function(r) {
            console.log(r.result);
          })
        })
        } else {
          chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, { command: 'hide', hide: shouldToggle }, function(r) {
              console.log(r.result);
            })
          })
        }
      });
    })
  }
});
