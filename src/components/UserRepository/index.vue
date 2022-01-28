<template>
  <div class="user-repository-container">
    <UserRepositoryHeader :repository="repository" />

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
import UserRepositoryHeader from '@/components/UserRepositoryHeader/index.vue'
import Button from '@/components/Button/index.vue'
import { openExternalLink } from '@/router'

@Component({
  components: {
    UserRepositoryHeader,
    Button
  }
})
export default class UserRepository extends Vue {
  @Prop(Object) readonly repository!: SourceCodeServiceRepository

  get description(): string {
    return this.repository.description || 'no description'
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

.user-repository-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
}
</style>
