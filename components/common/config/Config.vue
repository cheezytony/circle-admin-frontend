<script lang="ts" setup>
import { LazyCommonConfigText } from '#components';
import { Form } from 'vue3-form';
import { Configuration, ConfigurationInputType } from '~~/types/models';

const props = defineProps<{
  configuration: Configuration;
  form: Form;
  name: string;
}>();

const component = computed(() => {
  switch (props.configuration.input_type) {
    case ConfigurationInputType.SWITCH:
      break;
      case ConfigurationInputType.TEXT:
    default:
      return LazyCommonConfigText;
  }
});
</script>

<template>
  <div></div>
</template>
