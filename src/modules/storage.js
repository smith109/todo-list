const key = 'APP_DATA';

function storeAppData(data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadAppData() {
  return JSON.parse(localStorage.getItem(key));
}

export { storeAppData, loadAppData };
