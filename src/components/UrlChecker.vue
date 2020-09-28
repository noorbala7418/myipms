<template>
  <div>
    <b-jumbotron lead="Enter Your URL">
      <form v-on:submit.prevent>
        <input class="form-control" type="text" @keyup.enter="getInfo" v-model="url" required>
        <br><br>
        <b-button :disabled="!url.length" variant="success" @click="getInfo">Button</b-button>
      </form>
    </b-jumbotron>
    <div class="container" v-show="visible">
      <h3 v-text="url" align="center"></h3>
      <b-tabs content-class="mt-3">

        <b-tab title="IP" active>
          <p>IPv4: {{ info.ip_address }}</p>
          <p>IPv6: {{ info.ipv6_address }}</p>
        </b-tab>

        <b-tab title="Location">
          <img :src="info.location.countryIcon" :alt="info.location.countryName">
          {{ info.location.countryName }}
        </b-tab>

      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Url-Checker",
  props:{
    api: Object
  },
  data() {
    return {
      url: '',
      date: new Date(),
      temp: {},
      info: {
        ip_address: '',
        ipv6_address: '',
        location: {
          countryName: '',
          countryIcon: ''
        }
      },
      visible: false
    };
  },
  methods: {
    getInfo() {
      let appID = this.api.id;
      let appKey = this.api.key;
      let appUrl = this.api.url;
      let signature = this.signature();
      let timestamp = this.timestamp();
      let order = appUrl + '/' + this.url + '/api_id/' + appID + '/api_key/' +
          appKey + '/signature/' + signature + '/timestamp/' + timestamp;

      window.axios.get('https://cors-anywhere.herokuapp.com/' + order)
          .then(response => {
            this.temp = response.data;

            this.info.ip_address = this.temp.ip_address;
            this.info.ipv6_address = this.temp.ipv6_address;
            this.info.location.countryName = this.temp.location.countryName;
            this.info.location.countryIcon = this.temp.location.countryIcon;

            this.visible = true;
            console.log(this.temp);
          }).catch(error => {
        console.log(error);
      });
    },
    signature() {
      let appID = this.api.id;
      let appKey = this.api.key;
      let appUrl = this.api.url;
      let date = this.timestamp();

      let result = window.md5(appUrl + '/' + this.url + '/api_id/' + appID + '/api_key/' + appKey + '/timestamp/' + date).toString();

      return result;
    },
    timestamp() {
      let date = new Date();
      let year = date.toISOString().split('T')[0];
      let time = date.toISOString().split('T')[1].split('Z')[0].split('.')[0];
      return year + '_' + time;
    }
  }
}
</script>

<style scoped>
.container {
  margin: 10px auto;
}
</style>