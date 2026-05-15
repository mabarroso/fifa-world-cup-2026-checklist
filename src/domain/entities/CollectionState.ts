export interface CollectionStateData {
  owned: Record<string, number>;
  duplicates: Record<string, number>;
}

export class CollectionState {
  private _owned: Record<string, number>;
  private _duplicates: Record<string, number>;

  constructor(data?: CollectionStateData) {
    this._owned = data?.owned ? { ...data.owned } : {};
    this._duplicates = data?.duplicates ? { ...data.duplicates } : {};
  }

  get owned(): Record<string, number> {
    return { ...this._owned };
  }

  get duplicates(): Record<string, number> {
    return { ...this._duplicates };
  }

  markOwned(stickerId: string, quantity: number = 1): void {
    const current = this._owned[stickerId] || 0;
    const newQuantity = current + quantity;
    if (newQuantity <= 0) {
      delete this._owned[stickerId];
    } else {
      this._owned[stickerId] = newQuantity;
    }
  }

  unmarkOwned(stickerId: string, quantity: number = 1): void {
    this.markOwned(stickerId, -quantity);
  }

  markDuplicate(stickerId: string, quantity: number = 1): void {
    const current = this._duplicates[stickerId] || 0;
    const newQuantity = current + quantity;
    if (newQuantity <= 0) {
      delete this._duplicates[stickerId];
    } else {
      this._duplicates[stickerId] = newQuantity;
    }
  }

  unmarkDuplicate(stickerId: string, quantity: number = 1): void {
    this.markDuplicate(stickerId, -quantity);
  }

  getOwnedQuantity(stickerId: string): number {
    return this._owned[stickerId] || 0;
  }

  getDuplicateQuantity(stickerId: string): number {
    return this._duplicates[stickerId] || 0;
  }

  reset(): void {
    this._owned = {};
    this._duplicates = {};
  }

  getTotalOwned(): number {
    return Object.values(this._owned).reduce((sum, qty) => sum + qty, 0);
  }

  getTotalDuplicates(): number {
    return Object.values(this._duplicates).reduce((sum, qty) => sum + qty, 0);
  }

  toJSON(): CollectionStateData {
    return {
      owned: { ...this._owned },
      duplicates: { ...this._duplicates },
    };
  }

  static fromJSON(json: Partial<CollectionStateData>): CollectionState {
    return new CollectionState({
      owned: json.owned || {},
      duplicates: json.duplicates || {},
    });
  }
}