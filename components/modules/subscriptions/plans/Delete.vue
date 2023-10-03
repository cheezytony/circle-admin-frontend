<script lang="ts" setup>
import { SubscriptionPlan } from '~/types/models';
import { useForm } from 'vue3-form';
import { useFormRequest } from '~/utils/hooks/api';
import { useDisclosure } from '~/utils/hooks/misc';

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
  (e: 'success'): void;
}>();
const props = defineProps<{
  plan: SubscriptionPlan;
  isOpen: boolean;
}>();

const { isOpen: isSuccessOpen, open, onClose } = useDisclosure();

const form = useForm({});
const { submit } = useFormRequest(form, {
  url: `/plans/${props.plan.id}`,
  method: 'DELETE',
  service: 'SUBSCRIPTIONS',
  authorize: true,
  onSuccess: () => {
    open();
    emit('update:isOpen', false);
  },
});

onClose(() => emit('success'));
</script>

<template>
  <ModalConfirm
    :is-open="isOpen"
    :is-loading="form.loading"
    @update:is-open="emit('update:isOpen', $event)"
    @submit="submit"
  >
    You're about to delete a subscription plan. Would you like to proceed?
  </ModalConfirm>
  <ModalSuccess v-model:is-open="isSuccessOpen">
    Admin Deleted Successfully
  </ModalSuccess>
</template>
