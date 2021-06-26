# aclviewer

```
npm install -g @vue/cli
vue create .
npm run serve
firefox http://localhost:8080/


vue add vuetify

    "rules": {
      "vue/no-unused-components": "off",
      "no-unused-vars": "off"
    }

import axios from 'axios' //追記
import VueAxios from 'vue-axios' //追記
import Multiselect from '@vueform/multiselect'
app.use(VueAxios, axios)
// app.use(Multiselect, axios)
```

```
    <Multiselect
      v-model="selected_srchosts"
      mode="tags"
      placeholder="Select your characters"
      :options="srchosts()"
      :searchable="true"
    />
    import Multiselect from '@vueform/multiselect'
<style src="@vueform/multiselect/themes/default.css"></style>
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
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files   
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
