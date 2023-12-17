export interface IGithubRepositoryOwner {
  id: number;
  login: string;
}

export interface IGithubRepositoryTree {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export interface IGithubRepository {
  id: number;
  name: string;
  private: boolean;
  owner: IGithubRepositoryOwner;
  url: string;
  size: number;
}

export interface IRecursiveRepositoryData {
  sha: string;
  url: string;
  tree: IGithubRepositoryTree[];
}

export interface IRepositoryFileData {
  sha: string;
  node_id: string;
  size: number;
  url: string;
  content: string;
  encoding: 'base64';
}

export interface IRepositoryWebhookData {
  id: number;
  type: string;
  name: string;
  active: true;
}
