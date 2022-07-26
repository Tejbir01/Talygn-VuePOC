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
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left p-0 d-flex flex-wrap" 
    v-for="field in schema" :key="field">
        <div v-bind:class="{ 'col-sm-12 col-md-12 float-left': true, 'col-lg-6 col-xl-6': true }">
            <div class="form-group">
                <label>{{$t(field.name.toUpperCase())}}:<span v-if="field.is_required"
                        v-bind:class="{ 'text-danger': true }">*</span></label>
                <a href="javascript:;" :title="field.user_guide">
                    <i class="fa fa-question-circle-o text-popover" style="font-size: 14px;"></i>
                </a>
                <div class="row">
                    <div class="col-12 float-left">
                        <div class="input-group">
                            <component 
                            :field="field" 
                            :is="field.astype">
                            </component>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
