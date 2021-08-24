<template>
  <div>
    <v-row class="mt-10">
      <v-col cols="10">
        <h1 class="display-2 font-weight-bold mb-3">ACL Viewer</h1>
      </v-col>
    </v-row>

    <v-row
justify="center"
      ><v-col cols="5">
        <label class="typo__label">Src Hosts</label>
        <multiselect
          v-model="srchost"
          :options="srchosts"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="false"
        >
        </multiselect>
      </v-col>
      <v-col cols="5">
        <label class="typo__label">Dst Hosts</label>
        <multiselect
          v-model="dsthost"
          :options="dsthosts"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="false"
        >
        </multiselect>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-card-title>
            Result
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            item-key="name"
            :search="search"
            multi-sort
            class="elevation-1"
            dense
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "Tool1",

  components: { Multiselect },
  data() {
    return {
      srchost: [],
      srchosts: [{ name: "labelname", ipaddr: "192.168.1.1" }],
      dsthost: [],
      dsthosts: [{ name: "labelname", ipaddr: "192.168.1.2" }],
      selected: [],
      search: null,
      headers: [
        {
          text: "name",
          value: "name",
        },
        { text: "ipaddr", value: "ipaddr" },
      ],
      desserts: [
        { name: "1", ipaddr: "2" },
        { name: "2", ipaddr: "3" },
        { name: "3", ipaddr: "4" },
      ],
    };
  },

  methods: {
    _collect_hosts(two_tuples, param) {
      if (two_tuples.length == 0) {
        return [];
      } else {
        var tmp = [
          ...new Set(
            two_tuples.reduce((prev, cur) => {
              return [...prev, cur[param]];
            }, [])
          ),
        ];
        return tmp.map((name) => {
          return { name: name, host: name };
        });
      }
    },
    getData() {
      this.axios
        .get("/acl1.json")
        .then((response) => {
          this.srchosts = this._collect_hosts(response.data[0].two_tuples, 0);
          this.dsthosts = this._collect_hosts(response.data[0].two_tuples, 1);
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>