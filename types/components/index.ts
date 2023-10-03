import { ComputedRef, Ref } from 'vue';
import { NuxtLinkProps } from '#app';
import { DateTimeFormat } from '~~/utils/filters/dates';
import { NumberFormat } from '~~/utils/filters/numbers';
import { Form } from 'vue3-form';

export * from './datatable';

export interface DataListItem {
  title: string;
  value?: Date | string | number;
  type?: NumberFormat | DateTimeFormat;
  change?: number;
  href?: NuxtLinkProps['href'];
  isStatus?: boolean;
}

export interface DropdownProvision {
  uiID: string;

  index: Ref<number>;
  isOpen: Ref<boolean>;
  coordinates?: Ref<DOMRect | null>;
  updateCoordinates: (value: DOMRect) => void;

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

export interface ConfigurationFormProvision {
  form: Ref<Form>;
  updateFormField: (name: string, value: any) => void;
}
