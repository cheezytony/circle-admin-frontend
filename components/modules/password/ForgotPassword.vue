<script lang="ts" setup>
import { useForm } from 'vue3-form';
import { useFormRequest } from '~~/utils/hooks/api';

const emit = defineEmits<{
  (e: 'success', email: string): void;
}>();

const form = useForm({
  email: {},
});

const { submit } = useFormRequest(form, {
  url: '/password-reset',
  method: 'POST',
  onSuccess: () => emit('success', form.value.fields.email.value as string),
});
</script>

<template>
  <div class="w-full">
    <div class="mb-12">
      <Heading level="1" class="mb-2">
        Did you forget your password?
      </Heading>
      <p>Enter your email address below so we can help you reset it.</p>
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

        <div class="flex items-center justify-end mb-8">
          <RouterLink to="/login" class="text-sm text-black">
            Back to login.
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
              Continue
            </ButtonSubmit>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>
