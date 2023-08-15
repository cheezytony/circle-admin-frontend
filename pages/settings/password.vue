<script lang="ts" setup>
import { useForm } from 'vue3-form';
import { useDisclosure, useFormRequest } from '~/utils';

useHead({
  title: 'Password',
});

const { isOpen, open } = useDisclosure();
const form = useForm({
  old_password: {},
  password: {},
  password_confirmation: { rules: ['exact:password'] },
});
const { submit } = useFormRequest(form, {
  url: '/password',
  method: 'PUT',
  authorize: true,
  onSuccess: open,
});
</script>

<template>
  <div>
    <CommonForm @submit="submit">
      <CommonFormGroup
        v-model="form.fields.old_password.value"
        type="password"
        name="old_password"
        id="old_password"
        :form="form"
        label="Old Password"
        placeholder="e.g. myOldPassword-861"
        :can-toggle-password="false"
      />
      <CommonFormGroup
        v-model="form.fields.password.value"
        type="password"
        name="password"
        id="password"
        :form="form"
        label="New Password"
        placeholder="e.g. myNewPassword-153"
        :can-toggle-password="false"
      />
      <CommonFormGroup
        v-model="form.fields.password_confirmation.value"
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        :form="form"
        label="Confirm Password"
        placeholder="e.g. myNewPassword-153"
        :can-toggle-password="false"
      />

      <CommonMessage v-if="form.error" color-scheme="red">
        {{ form.error }}
      </CommonMessage>
      <CommonMessage v-else-if="form.success" color-scheme="green">
        {{ form.success }}
      </CommonMessage>

      <CommonButtonSubmit :form="form">Save Changes</CommonButtonSubmit>
    </CommonForm>

    <CommonModalSuccess v-model:is-open="isOpen">
      Password Updated Successfully
    </CommonModalSuccess>
  </div>
</template>
