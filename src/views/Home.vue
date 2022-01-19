<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <GithubUserSelect />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GithubUserSelect from '@/components/GithubUserSelect/index.vue'

@Component({
  components: { GithubUserSelect }
})
export default class Home extends Vue {
}
</script>
