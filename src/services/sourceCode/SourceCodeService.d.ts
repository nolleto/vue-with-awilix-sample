type SourceCodeServiceUser = {
  id: number
  login: string
  avatarUrl: string
}

type SourceCodeServiceRepository = {
  id: number
  description: string | null
  forksCount: number
  name: string
  openIssuesCount: number
  url: string
  starCount: number
}

type SourceCodeServiceSearchUserResult = Promise<SourceCodeServiceUser[]>
type SourceCodeServiceGetUserRepositoriesResult = Promise<SourceCodeServiceRepository[]>

type SourceCodeService = {
  name: string
  searchUser(term: string): SourceCodeServiceSearchUserResult;
  getUserRepositories(username: string): SourceCodeServiceGetUserRepositoriesResult;
}

export {
  SourceCodeService,
  SourceCodeServiceUser,
  SourceCodeServiceSearchUserResult,
  SourceCodeServiceRepository,
  SourceCodeServiceGetUserRepositoriesResult
}
