<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <div v-for="(item, index) in data" :key="index">
    {{index}}
    <div v-for="(rule, index) in item.rules" :key="index">
     {{index}}{{rule}}
    </div>
  </div> -->
   <div>
    <Multiselect
      v-model="selected_srchosts"
      mode="tags"
      placeholder="Select your characters"
      :options="srchosts()"
      :searchable="true"
    />
    <Multiselect
      v-model="selected_dsthosts"
      mode="tags"
      placeholder="Select your characters"
      :options="dsthosts()"
      :searchable="true"
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Multiselect from '@vueform/multiselect'
export default {
  name: 'App',
  components: {
    Multiselect
  },
  data() {
    return {
      data: [],
      selected_srchosts: null,
      selected_dsthosts: null,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    srchosts() {
      if(this.data.length == 0){
        return []
      } else {
        return [...new Set(this.data[0].two_tuples.reduce((prev, cur) => {
          return [...prev, cur[0]]
        }, []))]
      }
    },
    dsthosts() {
      if(this.data.length == 0){
        return []
      } else {
        return [...new Set(this.data[0].two_tuples.reduce((prev, cur) => {
          return [...prev, cur[1]]
        }, []))]
      }
    },
      getData() {
        this.axios.get('/acl1.json')
          .then((response) => {
            this.data = response.data
          })
          .catch((e) => {
            alert(e);
          });
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>

