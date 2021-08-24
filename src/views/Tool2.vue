<template>
  <div>
    <v-container class="grey lighten-5 pa-5">
      <v-row class="mt-5">
        <v-col cols="12">
          <h1 class="display-2 font-weight-bold mb-3">作業通知ジェネレータ</h1>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="4">
          <v-select
v-model="selected"
item-text="title"
:items="templates"
label="templates"
single-line
return-object
v-on:change="templateChanged"></v-select>
          <v-radio-group v-model="impact" row mandatory>
            <template v-slot:label>
              <div>作業影響</div>
            </template>
            <v-radio label="アリ" color="red" value="yes"></v-radio>
            <v-radio label="ナシ" color="green" value="no"> </v-radio>
          </v-radio-group>
          <v-select
v-model="selected_targets"
item-text="text"
:items="targets"
label="targets"
persistent-hint
single-line
multiple
chips
return-object></v-select>
          <v-text-field label="date" placeholder="Placeholder" v-model="date"></v-text-field>
          <v-date-picker v-model="date" year-icon="mdi-calendar-blank" prev-icon="mdi-skip-previous" next-icon="mdi-skip-next"></v-date-picker>
          <v-text-field label="作業者（name）" v-model="name" placeholder="Placeholder"></v-text-field>
          <v-text-field label="作業場所（place）" v-model="place" placeholder="Placeholder"></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="6">
              <v-textarea
name="template"
rows="30"
filled
label="template"
auto-grow
v-model="template_text"></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-textarea
name="rendered"
rows="30"
filled
label="rendered"
auto-grow
v-bind:value="renderedstring"></v-textarea>
              <button v-on:click="copyToClipboard">テキストをコピー</button>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import Handlebars from 'handlebars';

  import Data from './data/tool2data';
  export default {
    name: 'Tool2',

    components: {},
    data() {
      return {
        name: '',
        place: '',
        text: '',
        date: new Date().toISOString().substr(0, 10),
        selected_targets: [],
        template_text: '',
        targets: [],
        selected: null,
        templates: [],
      };
    },
    computed: {
      args: function() {
        return {
          name: this.name,
          place: this.place,
          date: this.date,
          machines: this.selected_targets.map(t => t.text).join('\n'),
          targets: this.selected_targets.map(t => t.text).join(', '),
          file: 'thisfile',
          username: 'myname',
        };
      },
      renderedstring: function() {
        var template = Handlebars.compile(this.template_text);
        return template(this.args1());
      },
    },
    methods: {
      args1: function() {
        return {
          name: this.name,
          place: this.place,
          date: this.date,
          machines: this.selected_targets.map(t => t.text).join('\n'),
          targets: this.selected_targets.map(t => t.text).join(', '),
          targetsa: this.selected_targets.map(t => t.text),
          file: 'thisfile',
          username: 'myname',
        };
      },
      templateChanged(template) {
        var ts = this.targets.filter(t => {
          return template.targets.includes(t.id);
        });
        this.selected_targets = ts;
        this.template_text = template.text;
      },
      set_template() {
        console.log(Data);
        this.$data.templates = Data.templates;
        this.$data.targets = Data.targets;
      },
      copyToClipboard(event) {
        navigator.clipboard.writeText(this.renderedstring).catch(e => {
          console.error(e);
        });
      },
    },
    created() {
      this.set_template();
    },
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
