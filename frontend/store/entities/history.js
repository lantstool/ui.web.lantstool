import { get, set } from 'lodash';
import { entity } from '@react-vault';

/*
  This is an example of a history state
  {
    '': {
      next: 'space',
      space: {
        next: '95ce6ac4-4baf-458d-a984-d65cb8990721',
        '95ce6ac4-4baf-458d-a984-d65cb8990721': {
          next: 'near-protocol',
          'near-protocol': {
            next: 'testnet',
            testnet: {
              next: 'transactions',
              transactions: {
                next: 'b8a1b538-4b3f-42b9-b481-36893b7167ad',
              },
            },
          },
        },
        '233439aa-ed2a-4322-adc2-c908211c3ea0': {
          next: 'near-protocol',
          'near-protocol': {
            next: 'mainnet',
            mainnet: {
              next: 'settings',
            },
            testnet: {
              next: 'accounts',
              transactions: {
                next: '8867fafc-fd29-4041-a1af-fd607e3c0ac3',
              },
            },
          },
        },
      },
    },
  };
*/

class History {
  constructor(name, version) {
    this.localStoragesName = `${name}.history.${version}`;
    this.history = this.load();
  }

  load = () => {
    const savedHistory = localStorage.getItem(this.localStoragesName);
    return savedHistory ? JSON.parse(savedHistory) : {};
  };

  save = () => {
    localStorage.setItem(this.localStoragesName, JSON.stringify(this.history));
  };

  splitPathOnSegments = (path) => {
    // When we pass a root URL '/' a split method will return ['', ''] so we want to avoid it.
    if (path === '/') return [''];
    // We use this check because sometimes user may forget to remove a closing / from URL.
    // Example: user is on /space/1/near-protocol/testnet/accounts and remove a
    // few segments from URL - let's say he has /space/1/near-protocol/ now.
    // Without removing '/' from the end we will have a bug - app will lead to the
    // default path, in this case - /space/1/near-protocol/networks
    if (path[path.length - 1] === '/') {
      return path.slice(0, path.length - 1).split('/');
    }
    return path.split('/');
  };

  getDestination = (path) => {
    const segments = this.splitPathOnSegments(path);

    const extractDestination = (segments) => {
      const nextRoute = get(this.history, [...segments, 'next']);
      return nextRoute ? extractDestination([...segments, nextRoute]) : segments;
    };
    const destination = extractDestination(segments).join('/');
    // We may have a situation when destination will be equal to the current URL - for example
    // if user enter space/1, and we don't have a record about 'next' segment, then the
    // result will be the same. In this case we want to return 'null' and the hook will know
    // that it has to redirect user to the default route
    return destination === path ? null : destination;
  };

  update = (path) => {
    const segments = this.splitPathOnSegments(path);

    segments.forEach((segment, index) => {
      // Last element is the end segment and doesn't have 'next'
      if (index >= segments.length - 1) return;
      // slice method doesn't include the 2 argument, this is why we use index + 1
      set(this.history, [...segments.slice(0, index + 1), 'next'], segments[index + 1]);
    });

    this.save();
  };

  // When we delete space we have to pass '/space/1' even we are on the page 'space/1/settings';
  remove = (path) => {
    const segments = this.splitPathOnSegments(path);
    // Get parent node which contains the deleting node
    const parentPath = segments.slice(0, -1);
    const parentNode = get(this.history, parentPath);
    // Remove target node
    const nodeToRemove = segments[segments.length - 1];
    delete parentNode[nodeToRemove];
    // If the node is currently active we have to clear 'next' connection as well
    if (parentNode.next === nodeToRemove) {
      delete parentNode.next;
    }
    this.save();
  };

  reset = () => {
    this.history = {};
    this.save();
  };
}

export const history = entity(() => {
  return new History('lantstool', 1);
});
