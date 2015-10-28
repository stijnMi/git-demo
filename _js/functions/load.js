export const loadImage = (url, id, catalog) => {
  return new Promise((resolve, reject) => {
    catalog[id] = new Image();
    catalog[id].addEventListener('load', event => {
      resolve(catalog[id]);
    });
    catalog[id].addEventListener('error', event => {
      reject(event);
    });
    catalog[id].setAttribute('src', url);
    if(catalog[id].complete) {
      resolve(catalog[id]);
    }
  });
};

export const getJSON = url => {
  return get(url).then(JSON.parse);
};

export const get = url => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.addEventListener('load', event => {
      if(req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.status));
      }
    });
    req.addEventListener('error', event => {
      reject(event);
    });
    req.addEventListener('abort', event => {
      reject(event);
    });
    req.send();
  });
};
