export type SortType = 'name' | 'price' | '-price' | '';

export interface Item {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  favorite: boolean;
  isAdded?: boolean;
}
