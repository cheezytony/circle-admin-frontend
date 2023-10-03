<script lang="ts" setup>
import { DataListItem } from '~~/types/components';
import { User } from '~~/types/models';

const props = defineProps<{
  user: User;
}>();
useHead({
  title: () => `${props.user.firstName}'s Profile`,
});

const user = computed(() => props.user);
const initials = computed(() => {
  return `${user.value?.firstName?.[0]}${user.value?.lastName?.[0]}`;
});
const avatar = computed(() => {
  return `https://ui-avatars.com/api/?background=000&color=fff&font-size=0.4&size=128name=${initials.value}`;
});

const profile = computed(() => user.value?.profile);
const address = computed(() => profile.value?.address);

const sections = computed(() => {
  const sections: Array<{ title: string; data: DataListItem[] }> = [
    {
      title: 'Personal Information',
      data: [
        {
          title: 'First Name',
          value: user.value.firstName,
        },
        {
          title: 'Last Name',
          value: user.value.lastName,
        },
        {
          title: 'Email',
          value: user.value.email,
        },
        {
          title: 'ID',
          value: user.value.id,
        },
        {
          title: 'Phone',
          value: user.value.phoneNumber,
        },
      ],
    },
    {
      title: 'Address',
      data: [
        {
          title: 'Street',
          value: address.value?.street,
        },
        {
          title: 'City',
          value: address.value?.city,
        },
        {
          title: 'State',
          value: address.value?.state,
        },
        {
          title: 'Zip Code',
          value: address.value?.postalCode,
        },
        {
          title: 'Country',
          value: address.value?.country,
        },
      ],
    },
  ];
  return sections;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="border border-gray-100 rounded-lg p-4 md:p-8">
      <div class="flex gap-4 items-center">
        <div class="">
          <img
            :src="avatar"
            :alt="`${user.firstName} ${user.lastName}`"
            class="rounded-full w-16 h-16"
          />
        </div>
        <div class="flex flex-col">
          <div class="font-medium">
            {{ user.firstName }} {{ user.lastName }}
          </div>
          <div class="text-sm text-gray-400">
            {{ user.email }}
          </div>
        </div>
      </div>
    </div>

    <template v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <div class="border border-gray-100 rounded-lg p-4 md:p-8">
        <div class="flex flex-col gap-8">
          <div class="font-medium">
            {{ section.title }}
          </div>
          <DataList :data="section.data" display="grid" size="sm" />
        </div>
      </div>
    </template>
  </div>
</template>
