<script lang="ts" setup>
import { ConfigurationFormProvision } from '~~/types/components';
import { Configuration, ConfigurationInputType } from '~~/types/models';

const props = defineProps<{
  configuration: Configuration;
}>();

const { form, updateFormField } =
  inject<ConfigurationFormProvision>('CONFIGURATION_FORM')!;

const formGroupType = computed(() => {
  switch (props.configuration.input_type) {
    case ConfigurationInputType.CURRENCY:
      return 'currency';
    case ConfigurationInputType.NUMBER:
      return 'number';
    case ConfigurationInputType.SELECT:
      return 'select';
    case ConfigurationInputType.TEXT:
    default:
      return 'text';
  }
});
const radioValue = ref('');

const field = form.value.fields[props.configuration.slug];
const handleInput = (value: string | number | boolean) => {
  updateFormField(props.configuration.slug, value);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <div
        v-if="
          configuration.input_type === ConfigurationInputType.CHECKBOX_GROUP
        "
      >
        <div class="mb-4 text-sm">{{ configuration.title }}</div>
        <div class="flex flex-wrap gap-8">
          <template v-for="option in configuration.options">
            <CommonFormCheckbox>
              {{ option.title }}
            </CommonFormCheckbox>
          </template>
        </div>
      </div>
      <div
        v-else-if="
          configuration.input_type === ConfigurationInputType.RADIO_GROUP
        "
      >
        <div class="mb-4 text-sm">{{ configuration.title }}</div>
        <div class="flex flex-wrap gap-8">
          <template v-for="option in configuration.options">
            <CommonFormRadio
              :name="configuration.slug"
              :value="option.value"
              v-model="radioValue"
            >
              {{ option.title }}
            </CommonFormRadio>
          </template>
        </div>
      </div>
      <div
        v-else-if="configuration.input_type === ConfigurationInputType.SWITCH"
      >
        <CommonFormSwitch
          :options="(configuration.options as any)"
          :model-value="(field.value as boolean)"
          @update:model-value="handleInput"
        >
          {{ configuration.title }}
        </CommonFormSwitch>
      </div>
      <div
        v-else-if="configuration.input_type === ConfigurationInputType.RANGE"
      >
        <CommonFormRange
          :model-value="(field.value as number)"
          @update:model-value="handleInput"
        >
          {{ configuration.title }}
        </CommonFormRange>
      </div>
      <CommonFormGroup
        v-else
        :form="form"
        :type="formGroupType"
        :name="configuration.slug"
        :id="configuration.slug"
        :label="configuration.title"
        :options="configuration.options"
        :model-value="configuration.value"
        class="mb-[0px]"
        @update:model-value="handleInput"
      />
    </div>
    <div class="text-gray-400 text-sm">
      {{ configuration.description }}
    </div>
  </div>
</template>
