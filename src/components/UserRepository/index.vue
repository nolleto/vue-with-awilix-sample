<template>
  <div class="user-repository-container">
    <div>
      <h3 class="user-repository-header__title">{{title}}</h3>
      <div class="user-repository-header__icons">
        <icon name="star" :title="starsIconTitle">{{starCount}}</icon>
        <icon name="tasks" :title="issuesIconTitle">{{openIssuesCount}}</icon>
        <icon name="code-branch" :title="forksIconTitle">{{forksCount}}</icon>
      </div>
    </div>

    <div class="user-repository-content">
      {{description}}
    </div>

    <div>
      <Button @click="handleOpenRepository">Open repository</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SourceCodeServiceRepository } from '@/services/sourceCode/SourceCodeService'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
import { openExternalLink } from '@/router'
import { useSourceCodeInfo } from '@/store/modules/sourceCode/info/module'

@Component({
  components: {
    Icon,
    Button
  },
  setup() {
    const { name: serviceName } = useSourceCodeInfo()

    return { serviceName }
  }
})
export default class UserRepository extends Vue {
  @Prop(Object) readonly repository!: SourceCodeServiceRepository

  serviceName!: string

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

  get starsIconTitle(): string {
    return `${this.serviceName} stars`
  }

  get issuesIconTitle(): string {
    return `${this.serviceName} issues`
  }

  get forksIconTitle(): string {
    return `${this.serviceName} forks`
  }

  handleOpenRepository(): void {
    openExternalLink(this.repository.url)
  }
}
</script>

<style scoped>
.user-repository-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 6px;
  transition: 0.3s;
  padding: 12px;
}

.user-repository-header__title {
  margin: 0;
}

.user-repository-header__icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.user-repository-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
}
</style>
