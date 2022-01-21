<template>
  <div class="home">
    <AppConfigs />
    <div class="home__title">
      <img class="home__title-image" alt="Vue logo" src="../assets/logo.png">
      <h1>ue with Awilix Sample App</h1>
    </div>

    <label class="home__select">
      <h3>Select a github user:</h3>
      <GithubUserSelect v-model="userSelected"/>
    </label>

    <GithubUserRepositories
      v-if="showRepositories"
      :user="userSelected"
      :key="userSelected.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GithubUserSelect from '@/components/GithubUserSelect/index.vue'
import GithubUserRepositories from '@/components/GithubUserRepositories/index.vue'
import AppConfigs from '@/components/AppConfigs/index.vue'
import { GithubServiceUser } from '@/services/github/GithubService'

@Component({
  components: {
    GithubUserSelect,
    GithubUserRepositories,
    AppConfigs
  }
})
export default class Home extends Vue {
  userSelected: GithubServiceUser | null = null

  get showRepositories(): boolean {
    return Boolean(this.userSelected?.id)
  }
}
</script>

<style scoped>
.home {
  flex-direction: column;
}

.home,
.home__title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__title-image {
  width: 40px;
  height: 40px;
}

.home__select {
  width: 100%;
  max-width: 300px;
}
</style>
