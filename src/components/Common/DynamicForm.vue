<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import NumericField from '../Common/NumericField.vue'
import SelectField from '../Common/SelectField.vue'
import TextField from '../Common/TextField.vue'
import DateField from '../Common/DateField.vue'
import CheckBoxField from '../Common/CheckBoxField.vue'
import RadioField from '../Common/CheckBoxField.vue'
export default {
    name: 'DynamicForm',
    components: {
        Form,
        Field,
        ErrorMessage,
        NumericField,
        SelectField,
        TextField,
        DateField,
        CheckBoxField,
        RadioField
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onSubmit(values) {
            console.log(values);
        },
    }
};
</script>
<template>
 <div class="row" v-for="(group,parentIndex) in schema" :key="parentIndex">
                        <div class="clearfix"></div>
                        <div class="col-lg-12 mb-3">
                            <div class="heading-border mt-2">
                                <h5 class="h5"><span>{{ $t(group.group_display_name)}}</span> </h5>
                            </div>
                        </div> 
    <div :class="{'col-sm-12 col-md-12 float-left': true, 'd-none' : field.form_field_visibility == 'NO',
                             'col-lg-12 col-xl-12': field.layout_type =='single', 'col-lg-6 col-xl-6': field.layout_type =='double', 'col-lg-4 col-xl-4': field.layout_type =='triple', 'col-lg-3 col-xl-3':
                             field.layout_type =='four' }" v-bind:id="field.name" 
    v-for="field in group.LeadData" :key="field">
        <div v-bind:class="{ 'col-sm-12 col-md-12 float-left': true, 'col-lg-6 col-xl-6': true }" v-if="field.form_field_visibility == 'YES'">
            <div class="form-group">
                <label>{{$t(field.label)}}:<span v-if="field.is_required"
                        v-bind:class="{ 'text-danger': true }">*</span></label>
                <a href="javascript:;" :title="field.user_guide">
                    <i class="fa fa-question-circle-o text-popover" style="font-size: 14px;"></i>
                </a>
                <div class="row">
                    <div class="col-12 float-left">
                        <div class="input-group">
                            <component 
                            :name="field.name" 
                            :is="field.astype"
                            :isRequired="field.is_required"
                            :options="field.select_options=='' || field.select_options=='Yes|1,No|0'||field.select_options==null ? undefined: JSON.parse(field.select_options)"
                            :value="field.value"
                            :optionslist="field.picklist_options">
                            </component>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>
