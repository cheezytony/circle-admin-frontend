<script lang="ts" setup>
import { useAuth } from '~~/store/auth';
import { useTheme } from '~~/store/theme';
import { storeToRefs } from 'pinia';

interface SidebarLink {
  exact?: boolean;
  href?: string;
  icon: string;
  title: string;

  isLogout?: boolean;

  children?: Array<Omit<SidebarLink, 'icon' | 'children'>>;
}

interface SidebarSection {
  title: string;
  links: Array<SidebarLink>;
}

const route = useRoute();
const { isSidebarCollapsed, isSmallScreen } = storeToRefs(useTheme());
const { toggleSidebar, closeSidebar } = useTheme();
const sections: Array<SidebarSection> = [
  {
    title: '',
    links: [
      {
        title: 'Dashboard',
        href: '/',
        icon: 'fas fa-table-columns',
        exact: true,
      },
      { title: 'Admins', href: '/admins', icon: 'fas fa-user-tie' },
    ],
  },
  {
    title: '',
    links: [
      { title: 'Users', href: '/users', icon: 'far fa-user' },
      {
        title: 'Transactions',
        href: '/transactions',
        icon: 'fas fa-money-bill-transfer',
      },
      { title: 'Stocks', href: '/stocks', icon: 'fas fa-chart-line' },
      {
        title: 'Savings',
        href: '/savings',
        icon: 'fas fa-file-invoice-dollar',
      },

      {
        title: 'Share and Earn',
        href: '/share-and-earn',
        icon: 'fas fa-share-alt',
      },
      { title: 'Loans', href: '/loans', icon: 'fas fa-money-bill' },
      { title: 'Insurance', href: '/insurance', icon: 'fas fa-shield-halved' },
      {
        title: 'Subscriptions',
        href: '/subscriptions',
        icon: 'square-check',
        children: [
          { title: 'Subscriptions', href: '/subscriptions', exact: true },
          { title: 'Plans', href: '/subscriptions/plans' },
        ],
      },
    ],
  },
  {
    title: '',
    links: [
      {
        title: 'Configurations',
        href: '/configurations',
        icon: 'fas fa-sliders',
      },
      { title: 'Settings', href: '/settings', icon: 'fas fa-gear' },
    ],
  },
  {
    title: '',
    links: [
      {
        title: 'Logout',
        icon: 'fas fa-arrow-right-from-bracket',
        isLogout: true,
      },
    ],
  },
];

watch(
  route,
  () => {
    isSmallScreen.value && closeSidebar();
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <aside
    class="bg-black duration-300 fixed inset-0 overflow-y-auto pb-8 pt-0 md:pt-8 z-[1091]"
    :class="
      isSidebarCollapsed
        ? 'px-8 md:px-4 -translate-x-full md:w-20 md:translate-x-0'
        : 'px-4 md:px-8 md:w-[300px]'
    "
  >
    <button
      class="appearance-none flex gap-6 h-[80px] items-center mb-16 text-purple-200 focus:outline-none"
      @click.prevent="toggleSidebar"
    >
      <div>
        <LogoDefault class="text-[7px]" />
      </div>
      <div class="font-medium text-2xl tracking-widest">CIRCLE</div>
    </button>

    <nav class="flex flex-col flex-grow gap-14">
      <template
        :key="title"
        v-for="({ title, links }, sectionIndex) in sections"
      >
        <AppSidebarSection v-bind="{ title, links }" />
      </template>
    </nav>
  </aside>
</template>
