<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useForm } from 'vue3-form';
import { useAuth } from '~~/store/auth';
import { Admin } from '~~/types/models';
import { useDisclosure, useFormRequest } from '~/utils';

useHead({
  title: 'My Profile',
});

const { isOpen, open } = useDisclosure();
const { user, avatar } = storeToRefs(useAuth());
const { updateUser } = useAuth();
const form = useForm({
  avatar: { rules: ['nullable'] },
  first_name: {},
  last_name: {},
  phone: { rules: ['phone'] },
});
const { submit } = useFormRequest<{ user: Admin }>(form, {
  authorize: true,
  url: '/profile',
  method: 'POST',
  useFormData: true,
  onSuccess: (data) => {
    data?.data?.user && updateUser(data?.data.user);
    open();
  },
  onUploadProgress: (event) => {
    console.log('progress');
    console.log(event.progress);
  },
  onDownloadProgress: () => {
    console.log('progress');
  },
});

const mapFormData = () => {
  if (!user.value) return;
  if (user.value.first_name) {
    form.value.fields.first_name.value = user.value.first_name;
  }
  if (user.value.last_name) {
    form.value.fields.last_name.value = user.value.last_name;
  }
  if (user.value.phone) {
    form.value.fields.phone.value = user.value.phone;
  }
};
onMounted(mapFormData);
</script>

<template>
  <div>
    <Form
      class="gap-x-8 grid grid-cols-1 md:grid-cols-2"
      @submit="submit"
    >
      <FormGroup
        v-model="form.fields.avatar.value"
        :form="form"
        name="avatar"
        type="dropzone"
        label="Avatar"
        accept=".png, .jpg, .jpeg"
        :preview="avatar"
        class="md:col-span-2"
      />

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
      <FormGroup
        :value="user?.email"
        :form="form"
        type="email"
        name="email"
        id="email"
        label="Email Address"
        placeholder="e.g. example@email.com"
        class="md:col-span-2"
        :readonly="true"
      />
      <FormGroup
        v-model="form.fields.phone.value"
        :form="form"
        type="phone"
        name="phone"
        id="phone"
        label="Phone Number"
        placeholder="e.g. 08012345678"
        class="md:col-span-2"
      />
      <div class="md:col-span-2">
        <Message v-if="form.error" color-scheme="red">
          {{ form.error }}
        </Message>
        <Message v-else-if="form.success" color-scheme="green">
          {{ form.success }}
        </Message>
      </div>
      <div class="md:col-span-2">
        <ButtonSubmit :form="form">Save Changes</ButtonSubmit>
      </div>
    </Form>

    <ModalSuccess v-model:is-open="isOpen">
      Profile Updated Successfully
    </ModalSuccess>
  </div>
</template>
