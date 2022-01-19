type GithubServiceUser = {
  id: number
  login: string
  avatarUrl: string
}

type GithubServiceSearchUserResult = Promise<GithubServiceUser[]>

type GithubService = {
  searchUser(term: string): GithubServiceSearchUserResult;
}

export {
  GithubService,
  GithubServiceUser,
  GithubServiceSearchUserResult
}
