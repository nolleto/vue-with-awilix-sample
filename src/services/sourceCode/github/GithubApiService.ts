import { SourceCodeService, SourceCodeServiceGetUserRepositoriesResult, SourceCodeServiceSearchUserResult } from '../SourceCodeService'

import { Octokit } from '@octokit/core'

class GithubApiService implements SourceCodeService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit()
  }

  name = 'Github'

  async searchUser(term: string): SourceCodeServiceSearchUserResult {
    const { data: { items: users } } = await this.octokit.request('GET /search/users', {
      q: term
    })

    return users.map(user => ({
      id: user.id,
      login: user.login,
      avatarUrl: user.avatar_url
    }))
  }

  async getUserRepositories(username: string): SourceCodeServiceGetUserRepositoriesResult {
    const { data: repositories } = await this.octokit.request('GET /users/{username}/repos', {
      username,
      sort: 'updated'
    })

    return repositories.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      forksCount: repo.forks_count ?? 0,
      openIssuesCount: repo.open_issues_count ?? 0,
      starCount: repo.stargazers_count ?? 0
    }))
  }
}

export default GithubApiService
