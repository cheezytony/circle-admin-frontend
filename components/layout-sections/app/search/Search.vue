<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useDisclosure } from '~~/utils/hooks/misc';

const { isOpen, close, open, onOpen } = useDisclosure(false);
const inputRef = ref<HTMLInputElement>();
const tabs = ['All', 'Admins', 'Users', 'Products', 'Transactions', 'Settings'];
const handleKeyUp = (event: KeyboardEvent) => {
  switch (event.key) {
    case '':
      
      break;
  
    default:
      break;
  }
}

onOpen(() => nextTick(() => inputRef.value?.focus()));
onMounted(() => window.addEventListener('keyup', handleKeyUp));
onBeforeUnmount(() => window.removeEventListener('keyup', handleKeyUp));
</script>

<template>
  <button
    class="bg-gray-100 h-12 max-w-full relative rounded-full text-gray-500 w-12 md:h-12 md:min-w-[300px] md:rounded"
    @click.prevent="open"
  >
    <span class="absolute hidden md:inline left-6 top-1/2 -translate-y-1/2">
      Search
    </span>
    <span
      class="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 md:right-6 md:translate-x-0"
    >
      <FontAwesomeIcon icon="search" />
    </span>
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="duration-300"
      enter-from-class="opacity-0"
      leave-active-class="duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="bg-black bg-opacity-50 cursor-pointer fixed inset-0 z-[1092]"
        @click="close"
      />
    </Transition>
    <Transition
      enter-active-class="duration-300"
      enter-from-class="opacity-0 scale-[0.99]"
      leave-active-class="duration-300"
      leave-to-class="opacity-0 scale-[0.99]"
    >
      <div
        v-if="isOpen"
        class="bottom-0 bg-white fixed left-1/2 rounded px-5 py-10 top-0 -translate-x-1/2 w-full z-[1093] md:m-6 md:px-10 md:w-[800px]"
      >
        <form @submit.prevent class="relative max-w-full mb-8 md:min-w-[300px]">
          <input
            ref="inputRef"
            type="text"
            class="bg-gray-100 border border-transparent px-6 py-3 text-sm outline-none w-full focus:bg-transparent focus:border-blue-500"
            placeholder="Search pages, products, customers etc..."
            @keyup.escape="close"
          />
          <span class="absolute right-6 text-gray-500 top-1/2 -translate-y-1/2">
            <FontAwesomeIcon icon="search" />
          </span>
        </form>

        <Tabs>
          <TabsNav :tabs="tabs" />
        </Tabs>

        <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
          <template v-for="i in 10">
            <AppSearchResult />
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
