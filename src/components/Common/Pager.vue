<script setup>
defineProps({
    numberofrecords: {
        type: Number,
        required: true
    },
    prevText: {
        type: String,
        required: true
    },
    nextText: {
        type: String,
        required: true
    },
    firstText: {
        type: String,
        required: true
    },
    lastText: {
        type: String,
        required: true
    },
    callbackfunction: {
        type: Function
    }
});
</script>

<template>
    <div class="nu-paging" v-if="TotalPages>0">        
       <nav aria-label="Page navigation example col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left">           
           <ul class="pagination row">   
               <li class="col-sm-12 col-md-6 col-lg-6 col-xl-6 float-left choose-page">
                   <span class="mr-2">Show</span>
                   <span class="select">
                       <select class="form-control form-control-sm" v-on:change="SetPageSize" id="pageSize" name="pageSize" v-model="PageSize">
                           <option v-for="item in PageSizeOption" v-bind:value="item">{{item}}</option>
                       </select>
                   </span>
                   <span class="ms-2">{{ $t('PagingText', [((CurrentPage-1)*PageSize)+1,(PageSize*CurrentPage > TotalRecords ? TotalRecords : PageSize*CurrentPage),TotalRecords]) }}</span>
               </li>               
                <li class="col-sm-12 col-md-6 col-lg-6 col-xl-6 float-left">                   
                      <ul class="paging-count" v-if="TotalPages>1">  
                        <li class="page-item">
                           <a v-bind:title="firstText" v-if="CurrentPage!=1" href="javascript:;" class="page-link first" val="1" v-on:click="SetCurrentPage(1)">{{firstText}}</a>
                            <a v-bind:title="firstText" v-if="CurrentPage==1" class="page-link first disabled" val="1">{{firstText}}</a>
                        </li>                       
                        <li class="page-item">                            
                           <a v-bind:title="prevText" class="page-link previous" href="javascript:;" v-if="CurrentPage!=1" v-on:click="SetCurrentPage(CurrentPage-1)">{{prevText}}</a>
                           <a v-bind:title="prevText" class="page-link previous disabled" v-if="CurrentPage==1">{{prevText}}</a>                           
                        </li>   
                        <template v-for="(data, index) in TotalPages">
                            <li v-if="data>=GroupStart && data<=GroupEnd" class="page-item">
                                <a class="page-link active" v-if="index+1==CurrentPage" href="javascript:;">{{index+1}}</a>
                                <a href="javascript:;" class="page-link" v-bind:val="index" v-if="index+1!=CurrentPage" v-on:click="SetCurrentPage(index+1)">{{index+1}}</a>
                            </li>
                        </template>
                        <li class="page-item">                            
                           <a v-bind:title="nextText" class="page-link next" href="javascript:;" v-if="CurrentPage<TotalPages" v-on:click="SetCurrentPage(CurrentPage1)">{{nextText}}</a>
                           <a v-bind:title="nextText" class="page-link disabled next" v-if="CurrentPage>=TotalPages">{{nextText}}</a>                           
                        </li>                       
                        <li class="page-item">                            
                           <a v-bind:title="lastText" v-if="CurrentPage!=TotalPages" href="javascript:;" class="page-link next" v-bind:val="TotalPages" v-on:click="SetCurrentPage(TotalPages)">{{lastText}}</a>
                           <a v-bind:title="lastText" v-if="CurrentPage==TotalPages" class="page-link next disabled" v-bind:val="TotalPages">{{lastText}}</a>                           
                        </li>                       
                    </ul>                   
                </li>               
            </ul>           
        </nav>       
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                TotalRecords: 0,
                PageNumber: 1,
                PageSize: 10,
                PageSizeOption: null,
                CurrentPage: 1,
                TotalPages: 0,
                GroupStart: 1,
                GroupEnd: 3,
                LastPage: false,
                //ParentObject: this.$parent
            }
        },
        watch: {
            numberofrecords: function (value) {
                //debugger;
                //this.CurrentPage = parseInt(this.ParentObject.CurrentPage, 10);
                //this.PageNumber = this.ParentObject.PageNumber;
                if (this.CurrentPage > this.PageNumber) {
                    this.CurrentPage = this.PageNumber;
                }
                this.TotalRecords = value;
                //this.PageSize = this.ParentObject.PageSize;
                this.TotalPages = Math.ceil(this.TotalRecords / this.PageSize);
                if (this.TotalPages == this.PageNumber && this.PageNumber > 3) {
                    this.GroupStart = this.PageNumber - 2;
                    this.GroupEnd = this.PageNumber;
                } else if (this.TotalPages > this.PageNumber && this.PageNumber >= 3) {
                    this.GroupStart = this.PageNumber - 1;
                    this.GroupEnd = this.PageNumber + 1;
                } else {
                    this.GroupStart = 1;
                    this.GroupEnd = 3;
                }
            },
            //parentobj: function (obj) {
            //    this.ParentObject = (obj != null && typeof (obj) != "undefined") ? obj : this.$parent;
            //}
        },
        created: function () {
            this.GetPageSizeOption();
        },
        methods: {
            GetData: function () {

                //this.ParentObject.PageNumber = this.PageNumber;
                //this.ParentObject.PageSize = this.PageSize;
                //this.ParentObject.GroupStart = this.GroupStart;
                //this.ParentObject.GroupEnd = this.GroupEnd;
                if (typeof this.callbackfunction != 'undefined' && this.callbackfunction != null) {
                    this.callbackfunction();
                } else {
                    //this.ParentObject.FetchData();
                }
                //debugger;
                //setTimeout(function(){ this.callfunction; }, 1);
            },
            SetPageSize: function (event) {
                this.PageSize = event.target.value;
                this.PageNumber = 1;
                this.CurrentPage = this.PageNumber;
                this.GroupStart = this.PageNumber;
                this.GroupEnd = this.PageNumber + 2;
                this.TotalPages = Math.ceil(this.TotalRecords / this.PageSize);
                this.GetData();
            },
            SetCurrentPage: function (pageNumber) {
                this.PageNumber = pageNumber;
                this.CurrentPage = pageNumber;
                if (pageNumber > this.GroupEnd || pageNumber == 1) {
                    this.GroupStart = pageNumber;
                    this.GroupEnd = pageNumber + 2;
                   
                }
                else if (pageNumber < this.GroupStart && pageNumber > 1) {
                    this.GroupEnd = this.GroupStart - 1;
                    this.GroupStart = pageNumber - 2;
                }
                this.GetData();
            },
            GetPageSizeOption: function () {
                var list = [];
                var defaultPageSize = 10;
                for (var i = defaultPageSize; i < defaultPageSize + 95; i += 5) {
                    list.push(i);
                }
                this.PageSizeOption = list;
            }
        }
    }
</script>
