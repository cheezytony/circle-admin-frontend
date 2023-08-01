<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { NuxtLink } from '#components';
import { useAuth } from '~~/store/auth';
import { useTheme } from '~~/store/theme';
import { storeToRefs } from 'pinia';

interface SidebarLink {
  exact?: boolean;
  href?: string;
  icon: string;
  title: string;

  isLogout?: boolean;
}

interface SidebarSection {
  title: string;
  links: Array<SidebarLink>;
}

const route = useRoute();
const { isSidebarCollapsed } = storeToRefs(useTheme());
const { toggleSidebar } = useTheme();
const { logout } = useAuth();
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
      { title: 'Subscriptions', href: '/subscriptions', icon: 'list-check' },
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
const isActiveRoute = ({ href, exact = false }: SidebarLink) => {
  const routePath = route.path;
  return (
    href && (exact ? href === routePath : !!routePath.match(new RegExp(href)))
  );
};

const handleLinkClick = ({ isLogout }: SidebarLink) => {
  if (isLogout) {
    logout();
  }
};
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
        <CommonLogoDefault class="text-[7px]" />
      </div>
      <div class="font-medium text-2xl tracking-widest">CIRCLE</div>
    </button>

    <nav class="flex flex-col flex-grow gap-16">
      <template
        :key="title"
        v-for="({ title, links }, sectionIndex) in sections"
      >
        <ul
          class="flex flex-col gap-8"
          :class="[sectionIndex === sections.length - 1 && 'mt-auto']"
        >
          <template :key="`${title}-${link.title}`" v-for="link in links">
            <CommonTooltip
              :content="link.title"
              :is-active="isSidebarCollapsed"
              placement="right-center"
            >
              <component
                :is="link.isLogout ? 'button' : NuxtLink"
                :to="link.href"
                class="appearance-none duration-300 flex gap-8 items-center relative text-sm"
                :class="[
                  isActiveRoute(link)
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-purple-100',
                ]"
                :aria-title="title"
                :title="link.title"
                @click="handleLinkClick(link)"
              >
                <span class="grid place-items-center w-9">
                  <span
                    class="grid h-auto opacity-75 place-items-center rounded-full text-lg w-10"
                  >
                    <FontAwesomeIcon :icon="link.icon" />
                  </span>
                </span>
                <span class="tracking-wide whitespace-nowrap">{{
                  link.title
                }}</span>
              </component>
            </CommonTooltip>
          </template>
        </ul>
      </template>
    </nav>
  </aside>
</template>
