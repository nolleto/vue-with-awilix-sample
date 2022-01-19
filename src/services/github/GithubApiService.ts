import { GithubService, GithubServiceSearchUserResult } from './GithubService'

import { Octokit } from '@octokit/core'

class GithubApiService implements GithubService {
  private octokit: Octokit;

  constructor () {
    this.octokit = new Octokit()
  }

  async searchUser (term: string): GithubServiceSearchUserResult {
    const { data: { items: users } } = await this.octokit.request('GET /search/users', {
      q: term
    })

    return users.map(user => ({
      id: user.id,
      login: user.login,
      avatarUrl: user.avatar_url
    }))
  }
}

export default GithubApiService
