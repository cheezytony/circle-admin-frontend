<script lang="ts" setup>
import { useForm } from 'vue3-form';
import { useFormRequest } from '~~/utils/hooks/api';

definePageMeta({
  middleware: ['auth'],
  layout: false,
});

useHead({
  title: 'Add a new admin',
});

const router = useRouter();

const form = useForm({
  first_name: {},
  last_name: {},
  email: { rules: ['required', 'email'] },
  phone: { rules: ['required', 'phone'] },
});
const { submit } = useFormRequest(form, {
  url: '/admins',
  method: 'POST',
  onSuccess: () => {
    router.push('/admins');
  },
});
</script>

<template>
  <NuxtLayout name="default">
    <template #summary> </template>
    <div class="max-w-[700px]">
      <CommonHeading level="2" class="mb-8">
        Create a new admin
      </CommonHeading>

      <CommonForm @submit="submit">
        <div class="gap-x-8 grid grid-cols-2">
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
          <div class="col-span-2">
            <CommonFormGroup
              v-model="form.fields.email.value"
              :form="form"
              name="email"
              id="email"
              label="Email Address"
              placeholder="e.g. antonio.o@credpal.com"
            />
          </div>
          <div class="col-span-2">
            <CommonFormGroup
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
          <CommonMessage color-scheme="green" v-if="form.success">
            <span class="ml-1">{{ form.success }}</span>
          </CommonMessage>
          <CommonMessage color-scheme="red" v-else-if="form.error">
            <span class="ml-1">{{ form.error }}</span>
          </CommonMessage>
        </div>
        <CommonButtonSubmit color-scheme="black" :form="form">
          Submit
        </CommonButtonSubmit>
      </CommonForm>
    </div>
  </NuxtLayout>
</template>
