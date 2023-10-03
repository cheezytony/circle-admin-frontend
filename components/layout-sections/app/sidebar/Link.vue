<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { NuxtLink } from '#components';
import { storeToRefs } from 'pinia';
import { useAuth } from '~/store/auth';
import { useTheme } from '~/store/theme';

export interface SidebarLink {
  exact?: boolean;
  href?: string;
  icon?: string;
  title: string;

  isLogout?: boolean;
  isChild?: boolean;

  children?: Array<Omit<SidebarLink, 'icon' | 'children'>>;
}
const props = defineProps<SidebarLink>();

const { isSidebarCollapsed } = storeToRefs(useTheme());
const { logout } = useAuth();
const route = useRoute();
const isActive = computed(() => {
  const { href, exact = false } = props;
  const routePath = route.path;
  return (
    href &&
    (exact ? href === routePath : !!routePath.match(new RegExp(`^${href}`)))
  );
});

const handleLinkClick = () => {
  if (props.isLogout) {
    logout();
  }
};
</script>

<template>
  <Tooltip
    :content="title"
    :is-active="isSidebarCollapsed"
    placement="right"
  >
    <component
      :is="isLogout ? 'button' : NuxtLink"
      :to="href"
      class="appearance-none duration-300 flex gap-8 items-center relative"
      :class="{
        'text-purple-400': isActive,
        'text-gray-400 hover:text-purple-100': !isActive,
        'text-sm': !isChild,
        'text-xs': isChild,
      }"
      :aria-title="title"
      :title="title"
      @click="handleLinkClick"
    >
      <span v-if="icon" class="grid place-items-center w-9">
        <span
          class="grid h-auto opacity-75 place-items-center rounded-full text-lg w-10"
        >
          <FontAwesomeIcon :icon="icon" />
        </span>
      </span>
      <span class="tracking-wide whitespace-nowrap">
        {{ title }}
      </span>
    </component>
  </Tooltip>
</template>
