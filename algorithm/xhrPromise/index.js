function getUrl(url) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();

    req.open('GET', url, true);

    req.onload = function() {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error(req.statusText));
    };

    req.send();
  });
}

getUrl('www.baidu.com')
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.err(err);
  });
