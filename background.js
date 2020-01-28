chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ hide: true }, function () {
    console.log('Defaulting all ads to have border from start');
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'www.google.com' }})], actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
