<template>
  <div>
    <v-row class="mt-10">
      <v-col cols="10">
        <h1 class="display-2 font-weight-bold mb-3">作業通知ジェネレータ</h1>
      </v-col>
    </v-row>

    <v-row justify="center"
      ><v-col cols="5">
        <v-text-field
          label="作業者（name）"
          v-model="name"
          placeholder="Placeholder"
        ></v-text-field>
        <v-text-field
          label="作業場所（place）"
          v-model="place"
          placeholder="Placeholder"
        ></v-text-field>
        <v-text-field
          label="date"
          placeholder="Placeholder"
          v-model="date"
        ></v-text-field>
        <v-date-picker
          v-model="date"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker>
        <v-select
          v-model="selected"
          item-text="title"
          :items="templates"
          label="templates"
          single-line
          return-object
          v-on:change="templateChanged"
        ></v-select>
        <v-textarea
          name="template"
          filled
          label="template"
          auto-grow
          v-model="template_text"
        ></v-textarea>

        <v-textarea
          name="rendered"
          filled
          label="rendered"
          auto-grow
          v-bind:value="renderedstring"
        ></v-textarea>

        <v-select
          v-model="selected_targets"
          item-text="text"
          :items="targets"
          label="targets"
          single-line
          multiple
          chips
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-card outlined>
          <v-card-text
            ><RichText
              ref="richtext"
              :text="template_text"
              :arguments="args"
              class=""
          /></v-card-text> </v-card
        >{{ args }}
        <button v-on:click="copyToClipboard">テキストをコピー</button></v-col
      >
    </v-row>
  </div>
</template>

<script>
import Handlebars from "@/plugins/handlebars";

import Data from "./data/tool2data";
export default {
  name: "Tool2",

  components: {},
  data() {
    return {
      name: "",
      place: "",
      text: "",
      date: new Date().toISOString().substr(0, 10),
      selected_targets: [],
      template_text: "",
      targets: [],
      selected: null,
      templates: [],
    };
  },
  computed: {
    args: function () {
      return {
        name: this.name,
        place: this.place,
        date: this.date,
        machines: this.selected_targets.map((t) => t.text).join("\n"),
        targets: this.selected_targets.map((t) => t.text).join(", "),
        file: "thisfile",
        username: "myname",
      };
    },
    renderedstring: function () {
      var template = Handlebars.compile(this.template_text);
      return template(this.args1());
    },
  },
  methods: {
    args1: function () {
      return {
        name: this.name,
        place: this.place,
        date: this.date,
        machines: this.selected_targets.map((t) => t.text).join("\n"),
        targets: this.selected_targets.map((t) => t.text).join(", "),
        targetsa: this.selected_targets.map((t) => t.text),
        file: "thisfile",
        username: "myname",
      };
    },
    templateChanged(template) {
      var ts = this.targets.filter((t) => {
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
      let text = this.$refs.richtext.$el.textContent;
      navigator.clipboard.writeText(text).catch((e) => {
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