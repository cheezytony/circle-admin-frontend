<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useForm } from 'vue3-form';
import { useAuth } from '~~/store/auth';
import { Admin } from '~~/types/models';
import { useFormRequest } from '~~/utils/hooks/api';

useHead({
  title: 'My Profile',
});

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
  onSuccess: (data) => data?.data?.user && updateUser(data?.data.user),
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
    <CommonForm
      class="gap-x-8 grid grid-cols-1 md:grid-cols-2"
      @submit="submit"
    >
      <CommonFormGroup
        v-model="form.fields.avatar.value"
        :form="form"
        name="avatar"
        type="dropzone"
        label="Avatar"
        accept=".png, .jpg, .jpeg"
        :preview="avatar"
        class="md:col-span-2"
      />

      <CommonFormGroup
        v-model="form.fields.first_name.value"
        :form="form"
        name="first_name"
        id="first_name"
        label="First Name"
        placeholder="e.g. Antonio"
      />
      <CommonFormGroup
        v-model="form.fields.last_name.value"
        :form="form"
        name="last_name"
        id="last_name"
        label="Last Name"
        placeholder="e.g. Okoro"
      />
      <CommonFormGroup
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
      <CommonFormGroup
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
        <CommonMessage v-if="form.error" color-scheme="red">
          {{ form.error }}
        </CommonMessage>
        <CommonMessage v-else-if="form.success" color-scheme="green">
          {{ form.success }}
        </CommonMessage>
      </div>
      <div class="md:col-span-2">
        <CommonButtonSubmit :form="form">Save Changes</CommonButtonSubmit>
      </div>
    </CommonForm>
  </div>
</template>
