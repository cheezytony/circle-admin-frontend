<script lang="ts" setup>
import { useForm } from 'vue3-form';
import { useAuth } from '~~/store/auth';
import { useFormRequest } from '~~/utils/hooks/api';
import { useCountdown } from '~~/utils/hooks/misc';

const props = defineProps<{
  email: string;
}>();

const { timeLeftFormatted, timeLeft, restart } = useCountdown(30);

const router = useRouter();
const { updatePassword } = useAuth();
const form = useForm({
  email: { value: props.email },
  code: {},
  password: {},
  password_confirmation: { rules: ['exact:password'] },
});
const forgotPasswordForm = useForm({
  email: { value: props.email },
});
const { submit } = useFormRequest(form, {
  url: '/password-reset',
  method: 'PUT',
  authorize: true,
  onSuccess: () => {
    updatePassword();
    router.push('/login');
  },
});

const { submit: resend } = useFormRequest(forgotPasswordForm, {
  url: '/password-reset',
  method: 'POST',
  onSuccess: restart,
});
</script>

<template>
  <div class="w-full">
    <div class="mb-12">
      <CommonHeading level="1" class="mb-2">
        Reset your password
      </CommonHeading>
      <p>
        Enter the code sent to
        <em class="bg-gray-200 font-medium p-1 rounded"> {{ email }} </em>.
      </p>
    </div>

    <CommonForm @submit="submit">
      <div class="flex flex-col">
        <div class="w-full">
          <CommonFormGroup
            v-model="form.fields.code.value"
            type="split"
            format="000000"
            name="code"
            id="code"
            :form="form"
            label="Code"
            :disabled="!!form.success"
          />

          <div class="text-sm mb-8">
            <span class="text-gray-500">Didn't receive the code? </span>
            <template v-if="timeLeft <= 0">
              <button
                class="appearance-none font-medium"
                title="Resend"
                type="button"
                :disabled="forgotPasswordForm.loading"
                @click.prevent="resend"
              >
                <CommonLoaderSmall v-if="forgotPasswordForm.loading" />
                <span v-else>Resend</span>
              </button>
            </template>
            <template v-else>
              <span>Resend in {{ timeLeftFormatted }}</span>
            </template>
          </div>
        </div>

        <div class="w-full">
          <CommonFormGroup
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
          <CommonFormGroup
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
            <CommonButtonSubmit
              color-scheme="black"
              :disabled="!!form.success"
              :form="form"
            >
              Change my password
            </CommonButtonSubmit>
          </div>
        </div>
      </div>
    </CommonForm>
  </div>
</template>
