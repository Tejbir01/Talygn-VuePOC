<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    optionslist: {
      type: String,
      required: false,
    },
  },
  data: function () {
    return {
      checkOptions: [],
    };
  },
  methods: {},
  created: function () {
    var self=this;
    if (this.optionslist != null && this.optionslist!=undefined && this.optionslist!='') {
      var splitted = this.optionslist.split(',');
    splitted.forEach(element => {
        self.checkOptions.push({
            name:element.split('|')[0],
          value: element.split('|')[1],
        });
    });
      console.log(self.checkOptions);
    }
  },
};
</script>
<template>
  <Field
    :name="name"
    :rules="{'required':isRequired?true:false}"
    :label="name"
    v-slot="{ field, errorMessage, meta}"
    type="checkbox"
  >
    <label v-for="item in checkOptions" :key="item">
      <input type="checkbox" :name="item.name" v-bind="field" :value="item.value" /> {{item.name}}
    </label>
    <!-- <label>
      <input type="checkbox" :name="name" v-bind="field" :value="item.value" /> {{item.name}}
    </label> -->
    <span v-if="meta.touched && !meta.valid" :name="name" class="invalid-feedback">{{errorMessage}}</span>
  </Field>
</template>