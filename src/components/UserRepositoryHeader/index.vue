<template>
  <div>
    <h3 class="user-repository-header__title">{{title}}</h3>
    <div class="user-repository-header__icons">
      <Icon name="star" :title="starsIconTitle">{{starCount}}</Icon>
      <Icon name="tasks" :title="issuesIconTitle">{{openIssuesCount}}</Icon>
      <Icon name="code-branch" :title="forksIconTitle">{{forksCount}}</Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SourceCodeServiceRepository } from '@/services/sourceCode/SourceCodeService'
import Icon from '@/components/Icon/index.vue'
import { useSourceCodeInfo } from '@/store/modules/sourceCode/info'

@Component({
  components: {
    Icon
  },
  setup() {
    const { name: serviceName } = useSourceCodeInfo()

    return { serviceName }
  }
})
export default class UserRepositoryHeader extends Vue {
  @Prop(Object) readonly repository!: SourceCodeServiceRepository

  serviceName!: string

  get title(): string {
    return this.repository.name
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
}
</script>

<style scoped>
.user-repository-header__title {
  margin: 0;
}

.user-repository-header__icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
