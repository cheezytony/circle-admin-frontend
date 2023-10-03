<script lang="ts" setup>
import { ConfigurationFormProvision } from '~/types/components';
import { Configuration, ConfigurationValueType } from '~/types';
import { ServiceNames, useDisclosure, useFormRequest } from '~/utils';
import { FormField, useForm } from 'vue3-form';

const props = defineProps<{
  configurations: Array<Configuration>;
  service: ServiceNames;
}>();

const { isOpen, open } = useDisclosure();
const configurations = computed(() => {
  return props.configurations?.sort((a, b) => {
    const aOrder = (a.order ?? 0).toString();
    const bOrder = (b.order ?? 0).toString();
    return bOrder.localeCompare(aOrder);
  });
});

const groups = computed(() => {
  const groups = new Map<string, Array<Configuration>>();
  configurations.value?.forEach((configuration) => {
    const groupName = configuration.group ?? 'General';
    const group = groups.get(groupName);
    if (group) {
      group.push(configuration);
    } else {
      groups.set(groupName, [configuration]);
    }
  });
  return groups;
});

const fields: Record<string, FormField> = {};
props.configurations?.forEach(({ slug, value, value_type }) => {
  let fieldValue: string | boolean | number | undefined = value;
  let rules: FormField['rules'] = ['required'];
  switch (value_type) {
    case ConfigurationValueType.BOOLEAN:
      fieldValue = value === 'true';
      break;
    case ConfigurationValueType.NUMBER:
      fieldValue = Number(value);
      // Set to nullable because the currency input always returns "0" which isn't null
      rules = ['numbers'];
      break;
  }

  fields[slug] = { value: fieldValue, rules };
});

const form = useForm(fields, {});
const {
  isLoading: isSubmitting,
  error,
  submit,
} = useFormRequest(form, {
  url: '/configurations',
  method: 'PATCH',
  service: props.service,
  authorize: true,
  wrapperKey: 'configurations',
  onSuccess: open,
});

const reset = () => {
  Object.keys(form.value.fields).forEach((name) => {
    form.value.fields[name].value = fields[name].value ?? '';
  });
};
const updateFormField = (name: string, value: any) => {
  if (!form.value.fields[name]) return;
  form.value.fields[name].value = value;
};

const submitForm = () => {
  submit();
};

provide<ConfigurationFormProvision>('CONFIGURATION_FORM', {
  form,
  updateFormField,
});
</script>

<template>
  <Form
    class="gap-4 grid grid-cols-1 md:gap-8 md:grid-cols-2"
    @submit="submitForm"
  >
    <template v-for="[name, configurations] in groups" :key="name">
      <ConfigurationsGroup v-bind="{ name, configurations }" />
    </template>
    <Card class="md:col-span-2">
      <div>
        <div class="flex gap-4 items-center mb-4">
          <Button
            :is-loading="form.loading"
            left-icon="check"
            type="submit"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            color-scheme="gray:soft"
            :disabled="form.loading"
            left-icon="rotate-left"
            @click="reset"
          >
            Reset
          </Button>
        </div>
        <p class="mb-4 text-gray-500 text-sm">
          Making changes to the system configurations of this service can have a
          significant impact on the performance of the application. It is
          important to make sure that the system configurations are set up
          correctly so that the application can run as efficiently as possible.
        </p>
        <p class="text-orange-500 opacity-50 text-sm">
          Please contact a developer if any issue occurs after making changes to
          the system configurations.
        </p>
      </div>
    </Card>
  </Form>

  <ModalSuccess v-model:is-open="isOpen">
    Configurations Updated Successfully
  </ModalSuccess>
</template>
