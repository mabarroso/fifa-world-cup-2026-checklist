import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FilterType = 'all' | 'missing' | 'owned' | 'duplicates';

interface CollectionStore {
  owned: Record<string, number>;
  duplicates: Record<string, number>;
  filter: FilterType;
  searchQuery: string;
  selectedStickerId: string | null;

  setOwned: (owned: Record<string, number>) => void;
  setDuplicates: (duplicates: Record<string, number>) => void;
  markOwned: (stickerId: string, quantity?: number) => void;
  markDuplicate: (stickerId: string, quantity?: number) => void;
  unmarkOwned: (stickerId: string, quantity?: number) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSticker: (id: string | null) => void;
  reset: () => void;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      owned: {},
      duplicates: {},
      filter: 'all',
      searchQuery: '',
      selectedStickerId: null,

      setOwned: (owned) => set({ owned }),
      setDuplicates: (duplicates) => set({ duplicates }),

        markOwned: (stickerId) =>
          set((state) => {
            const currentOwned = state.owned[stickerId] || 0;
            if (currentOwned === 0) {
              return { owned: { ...state.owned, [stickerId]: 1 } };
            }
            return {};
          }),

        markDuplicate: (stickerId) =>
          set((state) => {
            const currentOwned = state.owned[stickerId] || 0;
            const currentDuplicates = state.duplicates[stickerId] || 0;
            
            let newOwned = currentOwned;
            let newDuplicates = currentDuplicates;
            
            // If not in album yet, add to album first (mark as "En el álbum")
            if (newOwned === 0) {
              newOwned = 1;
              newDuplicates = 0; // Do NOT mark as duplicate
            } else if (newOwned === 1) {
              // If already in album, toggle duplicate state
              newDuplicates = 1 - currentDuplicates;
            }
            
            const ownedUpdate = newOwned > 0 ? { ...state.owned, [stickerId]: newOwned } : {};
            const duplicatesUpdate = newDuplicates > 0 ? { ...state.duplicates, [stickerId]: newDuplicates } : {};
            
            return {
              owned: ownedUpdate,
              duplicates: duplicatesUpdate,
            };
          }),

        unmarkOwned: (stickerId) =>
          set((state) => {
            // When removing from album, clear both owned and duplicates for this sticker
            const restOwned = { ...state.owned };
            delete restOwned[stickerId];
            const restDuplicates = { ...state.duplicates };
            delete restDuplicates[stickerId];
            
            return {
              owned: restOwned,
              duplicates: restDuplicates,
            };
          }),

      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedSticker: (id) => set({ selectedStickerId: id }),

      reset: () => set({ owned: {}, duplicates: {} }),
    }),
    {
      name: 'panini-collection',
      partialize: (state) => ({
        owned: state.owned,
        duplicates: state.duplicates,
      }),
    }
  )
);