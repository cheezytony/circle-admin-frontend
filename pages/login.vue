<script lang="ts" setup>
import { useForm } from 'vue3-form';
import FormGroup from '~~/components/common/form/FormGroup.vue';
import ButtonSubmit from '~~/components/common/button/ButtonSubmit.vue';
import Form from '~~/components/common/form/Form.vue';
import FormCheckbox from '~~/components/common/form/FormCheckbox.vue';
import { useAuth } from '~~/store/auth';
import { useFormRequest } from '~~/utils/hooks/api';
import { Admin } from '~~/types/models';

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});

useHead({
  title: 'Login',
});

const router = useRouter();
const form = useForm({
  email: {},
  password: {},
});

const { login } = useAuth();
const { submit } = useFormRequest<{ user: Admin; token: string }>(form, {
  url: '/auth/login',
  method: 'POST',
  onSuccess: (data) => {
    data?.data && login(data.data);
    router.push('/');
  },
});
</script>

<template>
  <section class="row">
    <div class="w-full">
      <div class="mb-12">
        <Heading level="1" class="mb-2">Hi, Welcome Back.</Heading>
        <p>Login to your account to resume your progress.</p>
      </div>

      <Form @submit="submit">
        <div class="flex flex-col">
          <div class="w-full">
            <FormGroup
              v-model="form.fields.email.value"
              type="email"
              name="email"
              id="email"
              :form="form"
              label="Email Address"
              placeholder="e.g. example@email.com"
              :disabled="!!form.success"
            />
          </div>

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
            />
          </div>

          <div class="flex items-center justify-end mb-4">
            <!-- <FormCheckbox>Remember Me?</FormCheckbox> -->
            <RouterLink to="/password/forgot" class="text-sm text-black">
              Forgot your password?
            </RouterLink>
          </div>

          <div class="w-full">
            <Message color-scheme="green" v-if="form.success">
              <i class="bi bi-check-square" />
              <span class="ml-1">{{ form.success }}</span>
            </Message>
            <Message color-scheme="red" v-else-if="form.error">
              <i class="bi bi-exclamation-square" />
              <span class="ml-1">{{ form.error }}</span>
            </Message>

            <div class="mb-3 mt-4">
              <ButtonSubmit
                color-scheme="black"
                :disabled="!!form.success"
                :form="form"
              >
                Login
              </ButtonSubmit>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </section>
</template>
