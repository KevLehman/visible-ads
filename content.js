// add global style
function addStyles() {
  var styles = `.visible-ad {
    border: 1px solid blue;
    padding: 1px;
  }`;

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styles;
  document.getElementsByTagName('head')[0].appendChild(style);
}

// toggler functions
function showAdBorder() {
  var ads = Array.from(document.getElementsByClassName('ads-ad'));
  ads.map(function(e) { e.classList.add('visible-ad') });
}

function removeAdBorder() {
  var ads = Array.from(document.getElementsByClassName('ads-ad'));
  ads.map(function(e) { e.classList.remove('visible-ad')});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === 'init') {
    showAdBorder();
  } else {
    removeAdBorder();
  }

  sendResponse({ result: 'OK' });
})

//on init perform based on chrome stroage value
window.onload=function(){  
  addStyles();

  chrome.storage.sync.get('hide', function(data) {
      if(data.hide){
        showAdBorder();
      }else{
        removeAdBorder();
      } 
  });
}
