type GithubServiceUser = {
  id: number
  login: string
  avatarUrl: string
}

type GithubServiceRepository = {
  id: number
  description: string | null
  forksCount: number
  name: string
  openIssuesCount: number
  url: string
  starCount: number
}

type GithubServiceSearchUserResult = Promise<GithubServiceUser[]>
type GithubServiceGetUserRepositoriesResult = Promise<GithubServiceRepository[]>

type GithubService = {
  searchUser(term: string): GithubServiceSearchUserResult;
  getUserRepositories(username: string): GithubServiceGetUserRepositoriesResult;
}

export {
  GithubService,
  GithubServiceUser,
  GithubServiceSearchUserResult,
  GithubServiceRepository,
  GithubServiceGetUserRepositoriesResult
}
