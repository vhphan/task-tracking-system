// import chroma from "chroma-js";
import { Notify } from 'quasar';

export const loadScript = function (url, scriptClass, callback = null) {
  let isLoaded = document.querySelectorAll('.' + scriptClass)
  if (isLoaded.length > 0) {
  } else {
    let myScript = document.createElement('script')
    myScript.src = url
    myScript.className = scriptClass
    document.body.appendChild(myScript)
    myScript.onload = function () {
      if (callback) callback();
    };
  }
}

export const rowsUnpack = function (jsonRows, key) {
  try {
    return jsonRows.map(function (jsonRow) {
      return jsonRow[key];
    });
  } catch (err) {
    console.log(err);
  }
}

export const sortDataArray = function (dataArray) {
  return dataArray.sort(function (a, b) {
    let aDate = new Date(a[0]);
    let bDate = new Date(b[0]);
    return aDate - bDate;
  });
}

export const zipArrays = function (a, b) {
  return a.map(function (e, i) {
    return [e, b[i]];
  });
}


export const titleCase = function (sentence) {
  sentence = sentence.toLowerCase().split('_');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
}

// export function getRandomColors(numOfColors) {
//   return [...Array(numOfColors)].map(() => chroma.random().hex());
// }

export const getCookie = (cookieName) => {
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    let [k, v] = el.split('=');
    cookie[k.trim()] = v;
  })
  return cookie[cookieName];
}

export const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


export const colorTrace = function (msg, color) {
  console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}

export function redirectToLogin(errorMessage) {
  Notify.create({
    message: errorMessage,
    type: 'negative',
    position: 'center',
  })
  Notify.create({
    message: 'Redirecting to Login Page in 5 seconds...',
    type: 'negative',
    position: 'center',
  })
  setTimeout(
    () => {
      window.location = 'https://ndo-portal.eprojecttrackers.com/login2.php?action=spa';
    }
    , 5000)
}
