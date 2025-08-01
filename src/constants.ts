export const UNSELECTED = "UNSELECTED";
export const ASCENDING = "ASCENDING";
export const DESCENDING = "DESCENDING";

export type SortType = typeof UNSELECTED | typeof ASCENDING | typeof DESCENDING;

export const titleStates: Array<string> = [UNSELECTED, ASCENDING, DESCENDING];

export const titleActionMap: Record<SortType, SortType> = {
  [UNSELECTED]: ASCENDING,
  [ASCENDING]: DESCENDING,
  [DESCENDING]: UNSELECTED,
};

export interface TitleSortType {
  name: SortType;
  username: SortType;
  email: SortType;
}
