<script lang="ts" setup>
import { useDisclosure } from '~/utils/hooks/misc';
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

const sections = computed(() => {
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
});

const { isOpen: isDeleteOpen, open: openDelete } = useDisclosure();

const router = useRouter();
const goBack = () => router.push('/admins');
</script>

<template>
  <div class="flex flex-col gap-4 md:gap-8">
    <div class="flex gap-4 md:gap-8">
      <CommonCard class="w-full">
        <div class="flex flex-grow h-full gap-4 items-center md:gap-8">
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
      </CommonCard>
      <CommonCard class="bg-red-50 ring-red-50 md:max-w-[300px]">
        <div class="flex flex-col gap-4 items-start">
          <div class="text-sm text-opacity-50">
            Once you delete this admin, it cannot be reversed. Please be
            certain.
          </div>
          <div class="flex gap-4">
            <CommonButton color-scheme="red" size="sm" left-icon="trash-can" @click="openDelete">
              Delete Admin
            </CommonButton>
          </div>
        </div>
      </CommonCard>
    </div>

    <template v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <CommonCard class="border border-gray-100 rounded-lg p-4 md:p-8">
        <CommonCardHeading>
          {{ section.title }}
        </CommonCardHeading>
        <CommonDataList :data="section.data" display="grid" size="sm" />
      </CommonCard>
    </template>

    <PageSectionsAdminDelete
      :admin="admin"
      v-model:is-open="isDeleteOpen"
      @success="goBack"
    />
  </div>
</template>
