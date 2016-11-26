import AppStore from '../app/store/AppStore';
import { gists } from '../__mocks__/gists';
import { gist } from '../__mocks__/gist';

function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return storage[key] || null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

window.localStorage = storageMock();


describe('AppStore', () => {
  const store = new AppStore();
  it('creates new label', () => {
    store.createLabel('label1');
    expect(store.labels[0]).toBe('label1');
    expect(store.labels.length).toBe(1);
  });

  it('removes label', () => {
    store.removeLabel('label1');
    expect(store.labels.length).toBe(0);
  });

  it('gets gists data', () => {
    window.fetch = jest.fn(() => new Promise((resolve) => {
      resolve(
        store.gists = store.gistsStatic = gists,
        store.gist = {},
        store.ownGists = true
      );
    }));
    store.getGistsData();
    expect(store.gistsType).toBe('all');
    expect(store.gists.slice()).toEqual(gists);
    expect(store.gistsStatic.slice()).toEqual(gists);
    expect(store.gist).toEqual({});
    expect(store.ownGists).toEqual(true);
  });

  it('gets public gists data', () => {
    window.fetch = jest.fn(() => new Promise((resolve) => {
      resolve(
        store.gists = store.gistsStatic = gists.filter(x => x.public),
        store.gist = {},
        store.ownGists = true
      );
    }));
    store.getPublicGistsData();
    expect(store.gistsType).toBe('public');
    expect(store.gists.slice()).toEqual(gists.filter(x => x.public));
    expect(store.gistsStatic.slice()).toEqual(gists.filter(x => x.public));
    expect(store.gist).toEqual({});
    expect(store.ownGists).toEqual(true);
  });

  it('gets private gists data', () => {
    window.fetch = jest.fn(() => new Promise((resolve) => {
      resolve(
        store.gists = store.gistsStatic = gists.filter(x => !x.public),
        store.gist = {},
        store.ownGists = true
      );
    }));
    store.getPrivateGistsData();
    expect(store.gistsType).toBe('private');
    expect(store.gists.slice()).toEqual(gists.filter(x => !x.public));
    expect(store.gistsStatic.slice()).toEqual(gists.filter(x => !x.public));
    expect(store.gist).toEqual({});
    expect(store.ownGists).toEqual(true);
  });

  it('gets gist data', () => {
    window.fetch = jest.fn(() => new Promise((resolve) => {
      resolve(
        store.gist = gist
      );
    }));
    store.getGistData();
    expect(store.gist).toEqual(gist);
  });

  it('gets starred gists data', () => {
    window.fetch = jest.fn(() => new Promise((resolve) => {
      resolve(
        store.gists = store.gistsStatic = gists,
        store.gist = {},
        store.ownGists = true
      );
    }));
    store.getStarredGistData();
    expect(store.gists.slice()).toEqual(gists);
    expect(store.gistsStatic.slice()).toEqual(gists);
    expect(store.gist).toEqual({});
    expect(store.ownGists).toEqual(true);
  });
});
