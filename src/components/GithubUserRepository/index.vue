<template>
  <div>
    GithubUserRepository: {{repository.name}}
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GithubServiceRepository } from '@/services/github/GithubService'

@Component
export default class GithubUserRepository extends Vue {
  @Prop(Object) readonly repository!: GithubServiceRepository
}
</script>
