<script>
export default {
  props: {
    // name: {
    //   type: String,
    //   required: false,
    // },
    // type: {
    //   type: String,
    //   required: false,
    // },
    // isRequired: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
    // optionslist: {
    //   type: String,
    //   required: false,
    // },
     field: {
                type: Object,
                required: true
            }            
  },
  data: function () {
    return {
      checkOptions: [],
    };
  },
  methods: {},
  created: function () {
    var self=this;
   var optionslist= this.field.picklist_options
    if (optionslist != null && optionslist!=undefined && optionslist!='') {
      var splitted = optionslist.split(',');
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
    :name="field.name"
    :rules="{'required':field.is_required?true:false}"
    :label="field.name"
    v-slot="{ field, errorMessage, meta}"
    type="checkbox">
    <label v-for="item in checkOptions" :key="item">
      <input type="checkbox" :name="item.name" v-bind="field" :value="item.value" /> {{item.name}}
    </label>
    <!-- <label>
      <input type="checkbox" :name="name" v-bind="field" :value="item.value" /> {{item.name}}
    </label> -->
    <span v-if="meta.touched && !meta.valid" :name="field.name" class="invalid-feedback">{{errorMessage}}</span>
  </Field>
</template>