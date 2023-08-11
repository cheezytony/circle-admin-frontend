<script lang="ts" setup>
import { DataListItem } from '~~/types/components';
import { Admin } from '~~/types/models';

const props = defineProps<{
  admin: Admin;
}>();
useHead({
  title: () => `${props.admin.first_name}'s Overview`,
});

const admin = computed(() => props.admin);
const initials = computed(() => {
  return `${props.admin?.first_name?.[0]}${props.admin?.last_name?.[0]}`;
});
const avatar = computed(() => {
  return (
    props.admin?.avatar ||
    `https://ui-avatars.com/api/?background=000&color=fff&font-size=0.4&size=128name=${initials.value}`
  );
});

const sections = computed(
  () => {
    const sections: Array<{ title: string; data: DataListItem[] }> = [
      {
        title: 'Personal Information',
        data: [
          {
            title: 'First Name',
            value: admin.value.first_name,
          },
          {
            title: 'Last Name',
            value: admin.value.last_name,
          },
          {
            title: 'Email',
            value: admin.value.email,
          },
          {
            title: 'ID',
            value: admin.value.id,
          },
          {
            title: 'Phone',
            value: admin.value.phone || '',
          },
        ],
      },
    ];
    return sections;
  }
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="border border-gray-100 rounded-lg p-4 md:p-8">
      <div class="flex gap-4 items-center">
        <div class="">
          <img
            :src="avatar"
            :alt="`${admin.first_name} ${admin.last_name}`"
            class="rounded-full w-16 h-16"
          />
        </div>
        <div class="flex flex-col">
          <div class="font-medium">
            {{ admin.first_name }} {{ admin.last_name }}
          </div>
          <div class="text-sm text-gray-400">
            {{ admin.email }}
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
          <CommonDataList :data="section.data" display="grid" size="sm" />
        </div>
      </div>
    </template>
  </div>
</template>
