<template>
  <div id="app">
    <Navbar></Navbar>
    <UrlChecker :api="api"></UrlChecker>
  </div>
</template>

<script>
import UrlChecker from '@/components/UrlChecker'
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    UrlChecker,
    Navbar
  },
  data(){
    return{
      api:{
        id : "idXXXXX",
        key : "XXXXXXXXXXXAPI_KEYXXXXXXXXXXXXXX",
        url : "https://api.myip.ms",
      }
    };
  }
}
</script>