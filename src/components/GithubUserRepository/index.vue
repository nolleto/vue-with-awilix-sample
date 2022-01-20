<template>
  <div class="gh-repository-container">
    <div>
      <h3 class="gh-repository-header__title">{{title}}</h3>
      <div class="gh-repository-header__icons">
        <icon name="star" title="Github stars">{{starCount}}</icon>
        <icon name="tasks" title="Github issues">{{openIssuesCount}}</icon>
        <icon name="code-branch" title="Github forks">{{forksCount}}</icon>
      </div>
    </div>

    <div class="gh-repository-content">
      {{description}}
    </div>

    <div>
      <Button @click="handleOpenRepository">Open repository</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GithubServiceRepository } from '@/services/github/GithubService'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
import { openExternalLink } from '@/router'

@Component({
  components: {
    Icon,
    Button
  }
})
export default class GithubUserRepository extends Vue {
  @Prop(Object) readonly repository!: GithubServiceRepository

  get title(): string {
    return this.repository.name
  }

  get description(): string {
    return this.repository.description || 'no description'
  }

  get forksCount(): number {
    return this.repository.forksCount
  }

  get starCount(): number {
    return this.repository.starCount
  }

  get openIssuesCount(): number {
    return this.repository.openIssuesCount
  }

  handleOpenRepository(): void {
    openExternalLink(this.repository.url)
  }
}
</script>

<style scoped>
.gh-repository-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 6px;
  transition: 0.3s;
  padding: 12px;
}

.gh-repository-header__title {
  margin: 0;
}

.gh-repository-header__icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.gh-repository-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
}
</style>
