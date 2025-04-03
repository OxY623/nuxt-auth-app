<template>
    <div>
        <input
            class="w-full p-3 focus:outline-none rounded-xl focus:ring-2 focus:ring-fuchsia-500"
            :class="{ 'border-red-500': errorMessage }"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateValue"
        />
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'Enter value'
    },
    errorMessage: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    return { updateValue };
  }
};
</script>
