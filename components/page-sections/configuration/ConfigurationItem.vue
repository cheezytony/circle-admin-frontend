<script lang="ts" setup>
import { Configuration, ConfigurationInputType } from '~~/types/models';

const props = defineProps<{
  configuration: Configuration;
}>();

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
</script>

<template>
  <div>
    <div v-if="configuration.input_type === ConfigurationInputType.CHECKBOX_GROUP">
      <div class="mb-4 text-sm">{{ configuration.title }}</div>
      <div class="flex flex-wrap gap-8">
        <template v-for="(option) in configuration.options">
          <CommonFormCheckbox>
            {{ option.title }}
          </CommonFormCheckbox>
        </template>
      </div>
    </div>
    <div v-else-if="configuration.input_type === ConfigurationInputType.RADIO_GROUP">
      <div class="mb-4 text-sm">{{ configuration.title }}</div>
      <div class="flex flex-wrap gap-8">
        <template v-for="(option) in configuration.options">
          <CommonFormRadio :name="configuration.slug" :value="option.value" v-model="radioValue">
            {{ option.title }}
          </CommonFormRadio>
        </template>
      </div>
    </div>
    <div v-else-if="configuration.input_type === ConfigurationInputType.SWITCH">
      <CommonFormSwitch>
        {{ configuration.title }}
      </CommonFormSwitch>
    </div>
    <CommonFormGroup
      v-else
      :type="formGroupType"
      :name="configuration.slug"
      :id="configuration.slug"
      :label="configuration.title"
      :options="configuration.options"
      :value="configuration.value"
    />
  </div>
</template>
