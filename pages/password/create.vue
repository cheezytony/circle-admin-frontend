<script lang="ts" setup>
import { useForm } from 'vue3-form';
import FormGroup from '~~/components/common/form/FormGroup.vue';
import ButtonSubmit from '~~/components/common/button/ButtonSubmit.vue';
import Form from '~~/components/common/form/Form.vue';
import { useAuth } from '~~/store/auth';
import { useFormRequest } from '~~/utils/hooks/api';

definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
});

useHead({
  title: 'Create Your Password',
});

const { user } = useAuth();
const router = useRouter();
const form = useForm({
  password: {},
  password_confirmation: { rules: ['exact:password'] },
});

const { updatePassword } = useAuth();
const { submit } = useFormRequest(form, {
  url: '/password',
  method: 'POST',
  authorize: true,
  onSuccess: () => {
    updatePassword();
    router.push('/');
  },
});
</script>

<template>
  <section class="row">
    <div class="w-full">
      <div class="mb-12">
        <CommonHeading level="1" class="mb-2">Hi, {{ user?.first_name }}</CommonHeading>
        <p>One final step before you're in. Please setup your a secure password for your account</p>
      </div>

      <Form @submit="submit">
        <div class="flex flex-col">

          <div class="w-full">
            <FormGroup
              v-model="form.fields.password.value"
              type="password"
              name="password"
              id="password"
              :form="form"
              label="Password"
              placeholder="e.g. myPassword-153"
              :disabled="!!form.success"
              :can-toggle-password="false"
            />
          </div>

          <div class="w-full">
            <FormGroup
              v-model="form.fields.password_confirmation.value"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              :form="form"
              label="Confirm Password"
              placeholder="e.g. myPassword-153"
              :disabled="!!form.success"
              :can-toggle-password="false"
            />
          </div>

          <div class="w-full">
            <CommonMessage color-scheme="green" v-if="form.success">
              <i class="bi bi-check-square" />
              <span class="ml-1">{{ form.success }}</span>
            </CommonMessage>
            <CommonMessage color-scheme="red" v-else-if="form.error">
              <i class="bi bi-exclamation-square" />
              <span class="ml-1">{{ form.error }}</span>
            </CommonMessage>

            <div class="mb-3 mt-4">
              <ButtonSubmit
                color-scheme="black"
                :disabled="!!form.success"
                :form="form"
              >
                Access My Account
              </ButtonSubmit>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </section>
</template>
