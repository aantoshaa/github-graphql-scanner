# GitHub repo GraphQL scanner

The service use an GitHub [API](https://docs.github.com/en/rest?apiVersion=2022-11-28)

## Downloading

```sh
git clone git@github.com:aantoshaa/github-graphql-scanner.git
```

## Running locally

> Note: `Create .env file from .env.example`

### Development

```sh
cd github-graphql-scanner
npm install
```

### Start application

#### Development

```sh
npm run start:dev
```

#### Production

```sh
npm run build
npm run start
```

## How to work with GraphQL

## Get many repos

### Query example:

```
query(
  $token: String!, $owner: String!, $repos: [String!]!
) {
	repos(token: $token, owner: $owner, repos: $repos) {
      name
      owner
      size
  }
}
```

### Response example:

```
{
  "data": {
    "repos": [
      {
        "name": "repoA",
        "owner": "aantoshaa",
        "size": 16440
      }
    ]
  }
}
```

## Get repo details

### Query example:

```
query(
  $token: String!, $owner: String!, $repo: String!, $branch: String!
) {
	repoDetails(token: $token, owner: $owner, repo: $repo, branch: $branch) {
      name
      owner
      size
      private
      firstYamlFileContent
      activeWebhooks {
        id
        type
        name
        active
      }
  }
}
```

### Response example:

```
{
  "data": {
    "repoDetails": {
      "name": "repoA",
      "owner": "aantoshaa",
      "size": 16440,
      "private": false,
      "firstYamlFileContent": "YML_FILE_CONTENT",
      "activeWebhooks": [
        {
          "id": 449350251,
          "type": "Repository",
          "name": "web",
          "active": true
        }
      ]
    }
  }
}
```
