<script lang="ts" setup>
import { NuxtLinkProps } from '#app';
import { DatatableProvision, DatatableRow } from '~~/types/components';

const props = defineProps<{
  index?: number;
  to?: NuxtLinkProps['to'];
}>();
const router = useRouter();

const { selectable, paginatedData, toggleSelection } =
  inject<DatatableProvision>('datatable')!;
const item = computed<DatatableRow>(
  () => props.index !== undefined && paginatedData.value[props.index]
);

const onClick = (event: MouseEvent) => {
  if (props.to) {
    const path = router.resolve(props.to).href;
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      return window.open(path);
    }
    return router.push(props.to);
  }

  if (selectable && item.value) {
    return toggleSelection(item.value.row);
  }
};
</script>

<template>
  <tr
    class="bg-white duration-300 even:bg-gray-50"
    :class="[(to || selectable) && 'cursor-pointer group hover:bg-gray-100']"
    @click="onClick"
  >
    <CommonDatatableTD v-if="selectable">
      <CommonFormCheckbox class="mb-0" :model-value="item.isSelected" />
    </CommonDatatableTD>
    <slot />
  </tr>
</template>
