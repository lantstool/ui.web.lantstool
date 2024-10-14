import { set } from 'lodash';
import { entity } from '../../../react-vault/index.js';

class History {
  constructor() {
    this.history = this.load();
    window.addEventListener('beforeunload', this.save.bind(this));
  }

  load() {
    const savedHistory = localStorage.getItem('Lantstool-history.1');
    return savedHistory ? JSON.parse(savedHistory) : {};
  }

  save() {
    localStorage.setItem('Lantstool-history.1', JSON.stringify(this.history));
  }

  update(path) {
    path.forEach((segment, index) => {
      if (index >= path.length - 1) return; // Last element is the end segment and doesn't have 'next'
      set(this.history, [...path.slice(0, index + 1), 'next'], path[index + 1]);
    });
    console.log(this.history);
  }

  get() {
    return this.history;
  }
}

export const history = entity(async ({ store, slice }) => {
  // const [backend] = store.getEntities((store) => store.backend);
  // console.log(window.document);
  return new History();
});
