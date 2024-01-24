<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAuth } from '~~/store/auth';
import { useTheme } from '~~/store/theme';

const props = defineProps<{ pageHasSummary: boolean }>();

const { toggleSidebar, toggleSummary } = useTheme();
const { isSidebarCollapsed, isSummaryOpen, isSmallScreen } = storeToRefs(
  useTheme()
);
const { logout } = useAuth();
const { avatar, name, initials } = storeToRefs(useAuth());
const isSticky = ref(false);

const width = computed(() => {
  if (isSmallScreen.value) return '100%';
  let difference = 0;

  if (props.pageHasSummary) {
    difference += isSummaryOpen.value ? 300 : 80;
  }
  difference += isSidebarCollapsed.value ? 80 : 300;

  return `calc(100% - ${difference}px)`;
});

const handleScroll = () => (isSticky.value = window.scrollY > 0);
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header
    class="bg-white duration-300 fixed right-0 top-0 w-full z-[1090] md:pt-8"
    :class="{
      'border-b-8 border-b-gray-100': isSticky,
    }"
    :style="{ width }"
  >
    <div class="flex gap-4 h-20 items-center px-4 relative md:px-8">
      <button class="mr-auto md:hidden" @click="toggleSidebar">
        <LogoDefault class="text-[6px]" />
      </button>
      <Button
        v-if="pageHasSummary && !isSmallScreen"
        color-scheme="white"
        class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
        size="sm"
        @click="toggleSummary"
      >
        <FontAwesomeIcon
          :icon="isSummaryOpen ? 'chevron-left' : 'chevron-right'"
        />
      </Button>
      <!-- <AppSearch /> -->

      <div class="md:ml-auto">
        <Dropdown
          placement="bottom-end"
          :items="[
            { title: 'My Profile', href: '/settings' },
            { title: 'Logout', onClick: logout },
          ]"
        >
          <button
            class="flex flex-shrink-0 gap-3 items-center text-gray-600 text-sm"
            type="button"
          >
            <span
              class="h-10 bg-black flex-shrink-0 grid overflow-hidden place-items-center rounded-full text-white w-10"
            >
              <img
                v-if="avatar"
                :src="avatar"
                :alt="name"
                class="h-full object-cover w-full"
              />
              <template v-else>
                {{ initials }}
              </template>
            </span>
            <span class="hidden md:block">
              {{ name }}
            </span>
            <FontAwesomeIcon icon="chevron-down" />
          </button>
        </Dropdown>
      </div>
    </div>
  </header>
</template>
