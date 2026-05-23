type LocalStorageMock = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

describe('collection store duplicate state', () => {
  let useCollectionStore: typeof import('../../src/gui/src/stores/collectionStore').useCollectionStore;

  beforeAll(async () => {
    const storage = new Map<string, string>();
    const localStorageMock: LocalStorageMock = {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => {
        storage.set(key, value);
      },
      removeItem: (key) => {
        storage.delete(key);
      },
      clear: () => {
        storage.clear();
      },
    };

    (globalThis as { localStorage?: LocalStorageMock }).localStorage = localStorageMock;

    ({ useCollectionStore } = await import('../../src/gui/src/stores/collectionStore'));
  });

  beforeEach(() => {
    useCollectionStore.setState({
      owned: {},
      duplicates: {},
      filter: 'all',
      sortOrder: 'album',
      searchQuery: '',
      selectedStickerId: null,
      migrated: false,
    });
  });

  it('keeps existing duplicates when marking another sticker as duplicate candidate', () => {
    const store = useCollectionStore.getState();

    store.markOwned('ARG01');
    store.markDuplicate('ARG01');
    expect(useCollectionStore.getState().duplicates).toEqual({ ARG01: 1 });

    store.markDuplicate('BRA01');

    const state = useCollectionStore.getState();
    expect(state.duplicates).toEqual({ ARG01: 1 });
    expect(state.owned.BRA01).toBe(1);
  });
});
