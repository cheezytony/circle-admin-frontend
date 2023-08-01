import { ComputedRef, Ref } from 'vue';
import { NuxtLinkProps } from '#app';
import { DateTimeFormat } from '~~/utils/filters/dates';
import { NumberFormat } from '~~/utils/filters/numbers';

export interface DataListItem {
  title: string;
  value: Date | string | number;
  type?: NumberFormat | DateTimeFormat;
  change?: number;
  href?: NuxtLinkProps['href'];
}

export interface DatatableProvision {
  getSelectionIndex: (item: any) => number;
  meta: Ref<DatatableMeta>;
  paginatedData: ComputedRef<Array<any>>;
  paginationLinks: ComputedRef<Array<number | null>>;
  search: Ref<DataTableSearch>;
  searchColumns: Array<DatatableSearchColumn>;
  searchColumnNames: ComputedRef<Array<string>>;
  selectable: boolean;
  selection: Ref<Array<any>>;
  showSearchColumns: boolean;
  sort: Ref<DatatableSort>;
  clearSelection: () => void;
  loadFromServer: () => void;
  navigate: (page: number) => void;
  next: () => void;
  prev: () => void;
  selectAll: (state: boolean) => void;
  setSearchColumn: (column: string) => void;
  setSearchKey: (key: string) => void;
  setSorting: (name: string) => void;
  toggleFilter: (filterName: string) => void;
  toggleSelection: (item: any) => void;
}

export interface DatatableRow {
  row: any;
  index: number;
  isSelected: boolean;
}
export interface DatatableMeta {
  count: number;
  limit: number;
  page: number;
  pages: number;
  total: number;
}
export interface DatatableSort {
  column?: string;
  orderByAscending: boolean;
}
export interface DataTableSearch {
  key: string;
  column?: string;
}
export type DatatableSearchColumn = string | { title: string; name: string };
export type DatatableFilter = {
  title?: string;
  name: string;
  action?: (item: any) => boolean;
};
export type DatatablePaginationLink = {
  isActive?: boolean;
  isDisabled?: boolean;
  title: string | number;
  action?: () => void;
};

export interface DropdownProvision {
  root: Ref<HTMLDivElement | undefined>;
  uiID: string;

  index: Ref<number>;
  isOpen: Ref<boolean>;

  close: () => void;
  open: () => void;
  toggle: () => void;

  next?: () => void;
  prev?: () => void;
  select?: () => void;

  keyDown: (event: KeyboardEvent) => void;
}

export interface TabsProvision {
  orientation?: 'horizontal' | 'vertical';
  tab: Ref<string | number>;

  setTab: (tab: string | number) => void;
}

export type TabLink =
  | string
  | { title: string; name?: string; href?: string; exact?: true };

export interface LinkProperties {
  namespace?: string;
  title: string;
  to?: NuxtLinkProps['to'];
}
