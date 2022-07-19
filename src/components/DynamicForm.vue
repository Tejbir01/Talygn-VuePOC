<script>
import Text from './Text.vue'
export default {
    components: { Text },
  props: {
    schema: { type: Object, required: true }
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    update (key, value) {
      this.form[key] = value

      this.$emit('input', {
        ...this.value,
        [key]: value
      })
    }
  },
  created () {
    var vm=this;
    for (let name in vm.schema) {
      //vm.$set(vm.form, name, null)
    }
  }
}
</script>
<template>
        <component
            v-for="(field, key) in schema"
            :key="key"
            :name="key"
            :is="field.data_type_name"
            v-bind="{ ...field }"
            :value="field.value"
            @input="update(key, $event)"
        >
        </component>
</template>