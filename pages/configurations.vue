<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'Settings',
});

const route = useRoute();
const categories = [
  // { title: 'Loans' },
  // { title: 'Insurance' },
  // {
  //   title: 'Stocks',
  //   href: '/configurations/stocks',
  //   description: '',
  //   icon: 'fas fa-chart-line',
  // },
  {
    title: 'Savings',
    href: '/configurations/savings',
    description: '',
    icon: 'fas fa-file-invoice-dollar',
  },
  {
    title: 'Wallet',
    href: '/configurations/wallet',
    description: '',
    icon: 'wallet',
  },
  {
    title: 'Subscriptions',
    href: '/configurations/subscriptions',
    description: '',
    icon: 'far fa-square-check',
  },
];
const activeCategory = computed(() => {
  return categories.find((category) => {
    return route.path.startsWith(category.href!);
  });
});
</script>

<template>
  <div>
    <PageHeading>
      <Heading level="2">Configurations</Heading>
    </PageHeading>

    <template v-if="activeCategory">
      <Tabs>
        <TabsNav :tabs="categories" />
      </Tabs>

      <div class="max-w-[1000px]">
        <RouterView />
      </div>
    </template>
    <template v-else>
      <div
        class="gap-4 grid grid-cols-1 max-w-[1000px] md:gap-8 md:grid-cols-2"
      >
        <template v-for="category in categories" :key="category.href">
          <NuxtLink :href="category.href">
            <Card class="duration-300 hover:bg-gray-50">
            <div class="flex gap-4 items-center">
              <div class="self-start text-2xl">
                <FontAwesomeIcon :icon="category.icon" />
              </div>

              <CardHeading>{{ category.title }}</CardHeading>
            </div>

            <div class="font-light text-gray-500">
              Natus, accusantium ad explicabo labore ratione esse fugiat
              distinctio nobis qui dolorem quidem aliquam repellendus sequi
              voluptates ullam quo reprehenderit quia tenetur.
            </div>
          </Card>
          </NuxtLink>
        </template>
      </div>
    </template>
  </div>
</template>
