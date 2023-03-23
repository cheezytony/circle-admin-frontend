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

const router = useRouter();
const route = useRoute();
const { sidebarWidth, isSidebarOpen, isSidebarCollapsed } = storeToRefs(
  useTheme()
);
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
      { title: 'Savings', href: '/savings', icon: 'fas fa-piggy-bank' },
      { title: 'Insurance', href: '/insurance', icon: 'fas fa-shield-halved' },
      { title: 'Loans', href: '/loans', icon: 'fas fa-receipt' },
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
    router.push('/login');
  }
};
</script>

<template>
  <div class="h">
    <aside
      class="bg-black duration-300 fixed flex flex-col flex-shrink-0 h-full pb-16 pt-4 text-white z-[1002] md:h-screen md:sticky md:top-0 md:pt-16"
      :class="[isSidebarOpen ? '' : '-translate-x-full md:translate-x-0']"
      :style="{
        width: sidebarWidth,
      }"
    >
      <div
        class="duration-300 mb-16"
        :class="[!isSidebarCollapsed ? 'px-5 md:px-10' : 'px-5']"
      >
        <button
          class="appearance-none flex gap-6 h-12 items-center text-purple-200 focus:outline-none"
          @click.prevent="toggleSidebar"
        >
          <div>
            <CommonLogoDefault class="text-[7px]" />
          </div>
          <Transition
            enter-from-class="delay-300 opacity-0"
            enter-active-class="delay-300 duration-1000"
            leave-active-class="duration-300"
            leave-to-class="opacity-0"
          >
            <div
              v-if="!isSidebarCollapsed"
              class="font-medium text-2xl tracking-widest"
            >
              CIRCLE
            </div>
          </Transition>
        </button>
      </div>

      <nav class="flex flex-col flex-grow gap-20">
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
                  class="appearance-none duration-300 flex gap-6 items-center relative text-sm"
                  :class="[
                    isActiveRoute(link)
                      ? 'font-medium text-purple-300'
                      : 'text-gray-400 hover:text-gray-200',
                    !isSidebarCollapsed ? 'px-5 md:px-10' : 'px-4',
                  ]"
                  :aria-title="title"
                  :title="link.title"
                  @click="handleLinkClick(link)"
                >
                  <span
                    class="absolute bg-purple-200 duration-300 h-full left-0 top-1/2 -translate-y-1/2 w-1"
                    :class="[isActiveRoute(link) ? '' : 'opacity-0']"
                  />
                  <span class="grid place-items-center w-9">
                    <span
                      class="grid h-auto opacity-75 place-items-center rounded-full text-lg w-10"
                    >
                      <FontAwesomeIcon :icon="link.icon" />
                    </span>
                  </span>
                  <Transition
                    enter-from-class="delay-300 opacity-0"
                    enter-active-class="delay-300 duration-1000"
                    leave-to-class="opacity-0"
                  >
                    <span v-if="!isSidebarCollapsed">{{ link.title }}</span>
                    <span v-else>&nbsp;</span>
                  </Transition>
                </component>
              </CommonTooltip>
            </template>
          </ul>
        </template>
      </nav>
    </aside>
  </div>
</template>
