<script lang="ts" setup>
import { useFormRequest } from '~~/utils/hooks/api';
import { useForm } from 'vue3-form';
import { Admin } from '~~/types/models';
import { useDisclosure } from '~/utils/hooks/misc';

const props = defineProps<{
  admin: Admin;
}>();
useHead({
  title: () => `Edit ${props.admin.first_name}'s Profile`,
});

const { isOpen, open } = useDisclosure();
const form = useForm({
  first_name: {},
  last_name: {},
  email: { rules: ['required', 'email'] },
  phone: { rules: ['required', 'phone'] },
});
const { submit } = useFormRequest(form, {
  authorize: true,
  url: `/admins/${props.admin.id}`,
  method: 'PUT',
  onSuccess: open,
});

const mapFormData = () => {
  if (!props.admin) return;
  if (props.admin.first_name) {
    form.value.fields.first_name.value = props.admin.first_name;
  }
  if (props.admin.last_name) {
    form.value.fields.last_name.value = props.admin.last_name;
  }
  if (props.admin.phone) {
    form.value.fields.phone.value = props.admin.phone;
  }
  if (props.admin.email) {
    form.value.fields.email.value = props.admin.email;
  }
};

onMounted(mapFormData);
</script>

<template>
  <div class="max-w-[500px]">
    <Form @submit="submit">
      <div class="gap-x-8 grid grid-cols-2">
        <FormGroup
          v-model="form.fields.first_name.value"
          :form="form"
          name="first_name"
          id="first_name"
          label="First Name"
          placeholder="e.g. Antonio"
        />
        <FormGroup
          v-model="form.fields.last_name.value"
          :form="form"
          name="last_name"
          id="last_name"
          label="Last Name"
          placeholder="e.g. Okoro"
        />
        <div class="col-span-2">
          <FormGroup
            v-model="form.fields.email.value"
            :form="form"
            name="email"
            id="email"
            label="Email Address"
            placeholder="e.g. antonio.o@credpal.com"
          />
        </div>
        <div class="col-span-2">
          <FormGroup
            v-model="form.fields.phone.value"
            :form="form"
            type="phone"
            name="phone"
            id="phone"
            label="Phone Number"
            placeholder="e.g. 08012345678"
          />
        </div>
      </div>
      <div class="mb-8">
        <Message color-scheme="green" v-if="form.success">
          <span class="ml-1">{{ form.success }}</span>
        </Message>
        <Message color-scheme="red" v-else-if="form.error">
          <span class="ml-1">{{ form.error }}</span>
        </Message>
      </div>
      <ButtonSubmit color-scheme="black" :form="form">
        Submit
      </ButtonSubmit>
    </Form>

    <ModalSuccess v-model:is-open="isOpen">
      Admin Updated Successfully
    </ModalSuccess>
  </div>
</template>
