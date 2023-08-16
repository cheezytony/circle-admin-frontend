<script lang="ts" setup>
import { Admin } from '~/types/models';
import { useForm } from 'vue3-form';
import { useFormRequest } from '~/utils/hooks/api';
import { useDisclosure } from '~/utils/hooks/misc';

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
  (e: 'success'): void;
}>();
const props = defineProps<{
  admin: Admin;
  isOpen: boolean;
}>();

const { isOpen: isSuccessOpen, close, open, onClose } = useDisclosure();

const form = useForm({});
const { submit } = useFormRequest(form, {
  url: `/admins/${props.admin.id}`,
  method: 'DELETE',
  service: 'ADMIN',
  authorize: true,
  onSuccess: () => {
    open();
    emit('update:isOpen', false);
  },
});

onClose(() => emit('success'));
</script>

<template>
  <CommonModalConfirm
    :is-open="isOpen"
    :is-loading="form.loading"
    @update:is-open="emit('update:isOpen', $event)"
    @submit="submit"
  >
    You're about to delete an admin. Would you like to proceed?
  </CommonModalConfirm>
  <CommonModalSuccess v-model:is-open="isSuccessOpen">
    Admin Deleted Successfully
    <template #buttons>
      <CommonButton @click="close">Go to Admins</CommonButton>
    </template>
  </CommonModalSuccess>
</template>
