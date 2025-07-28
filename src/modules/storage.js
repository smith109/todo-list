const key = 'todoItems';

const save = (data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const load = () => {
  return JSON.parse(localStorage.getItem(key));
}

export default {
  save,
  load,
};