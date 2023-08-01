<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAuth } from '~~/store/auth';
import { useTheme } from '~~/store/theme';

const { toggleSidebar } = useTheme();
const { avatar, name, initials } = storeToRefs(useAuth());
</script>

<template>
  <header class="bg-white fixed left-0 px-5 py-4 md:py-16 md:sticky top-0 w-full md:w-auto z-[1001] md:px-10">
    <div class="flex gap-4 h-12 items-center md:gap-8">
      <button class="mr-auto md:hidden" @click="toggleSidebar">
        <CommonLogoDefault class="text-[7px]" />
      </button>
      <LayoutSectionsAppSearch />

      <button
        class="appearance-none bg-gray-100 flex-shrink-0 h-12 md:ml-auto rounded-full w-12"
        type="button"
      >
        <FontAwesomeIcon icon="fa-regular fa-bell" />
      </button>
      <div>
        <button
          class="appearance-none flex flex-shrink-0 gap-3 items-center text-gray-600 text-sm"
          type="button"
        >
          <span class="h-10 bg-black flex-shrink-0 grid overflow-hidden place-items-center rounded-full text-white w-10">
            <img v-if="avatar" :src="avatar" :alt="name" class="h-full object-cover w-full">
            <template v-else>
              {{ initials }}
            </template>
          </span>
          <span class="hidden md:block">
            {{ name }}
          </span>
          <FontAwesomeIcon icon="chevron-down" />
        </button>
      </div>
    </div>
  </header>
</template>
