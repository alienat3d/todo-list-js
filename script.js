const todoInput = document.querySelector('.todo__input');
const todoBtn = document.querySelector('.todo__btn');
const todoList = document.querySelector('.todo__list');

const saveData = () => localStorage.setItem('tasks', todoList.innerHTML);
const loadData = () => (todoList.innerHTML = localStorage.getItem('tasks'));

const addTask = () => {
  const newListItem = document.createElement('li');
  const removeBtn = document.createElement('button');

  newListItem.classList.add('todo__list-item');
  removeBtn.classList.add('todo__remove-btn');

  newListItem.innerText = todoInput.value;
  removeBtn.insertAdjacentHTML(
    'afterbegin',
    '<svg width="26" height="26"><path fill="#aaa" stroke="#63001C" stroke-miterlimit="10" d="M13 .5C6.056.5.5 6.056.5 13S6.056 25.5 13 25.5 25.5 19.944 25.5 13 19.944.5 13 .5Zm2.315 18.518L13 14.944l-2.407 4.167H7.63l3.888-6.204-3.703-5.926h3.055L13 10.963l2.222-3.982h2.963l-3.703 5.834 3.888 6.296-3.055-.093Z" /></svg>'
  );

  newListItem.appendChild(removeBtn);
  todoList.appendChild(newListItem);

  setTimeout(() => newListItem.classList.add('visible'), 0);
};

todoInput.addEventListener('input', () => {
  todoInput.value === ''
    ? todoBtn.classList.remove('visible')
    : todoBtn.classList.add('visible');
});

todoBtn.addEventListener('click', () => {
  addTask();
  setTimeout(() => {
    todoInput.value = '';
    todoBtn.classList.remove('visible');
    saveData();
  }, 0);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter' && todoInput.value !== '') {
    addTask();
    setTimeout(() => {
      todoInput.value = '';
      todoBtn.classList.remove('visible');
      saveData();
    }, 0);
  }
});

todoList.addEventListener('click', (evt) => {
  const tgt = evt.target;
  const listItem = tgt.closest('li');

  if (tgt.closest('.todo__remove-btn')) {
    listItem.classList.remove('visible');
    setTimeout(() => {
      tgt.closest('li').remove();
      saveData();
    }, 500);
    return;
  }

  if (listItem) listItem.classList.toggle('checked');

  saveData();
});

loadData();
