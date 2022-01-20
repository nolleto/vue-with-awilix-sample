import { GithubService, GithubServiceGetUserRepositoriesResult, GithubServiceSearchUserResult } from './GithubService'

import { Octokit } from '@octokit/core'

class GithubApiService implements GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit()
  }

  async searchUser(term: string): GithubServiceSearchUserResult {
    const { data: { items: users } } = await this.octokit.request('GET /search/users', {
      q: term
    })

    return users.map(user => ({
      id: user.id,
      login: user.login,
      avatarUrl: user.avatar_url
    }))
  }

  async getUserRepositories(username: string): GithubServiceGetUserRepositoriesResult {
    const { data: repositories } = await this.octokit.request('GET /users/{username}/repos', {
      username
    })

    return repositories.map(repo => ({
      id: repo.id,
      forksCount: repo.forks_count ?? 0,
      name: repo.name,
      openIssuesCount: repo.open_issues_count ?? 0,
      url: repo.html_url,
      description: repo.description
    }))
  }
}

export default GithubApiService
