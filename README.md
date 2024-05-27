# my-new-action

[![Test & Lint](https://github.com/kachick/action-typescript-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kachick/action-typescript-template/actions/workflows/ci.yml?query=branch%main++)

There is a sin of omission as well as of commission.

## Usage

I recommend to use `timeout-minutes` together with as easy fool proof.\
Below is a typical usecase.

```yaml
name: Description of the workflow
on: pull_request

permissions:
  contents: write
  pull-requests: write
  # checks: read # For private repositories
  # actions: read # For private repositories

jobs:
  example-of-my-new-action:
    runs-on: ubuntu-24.04
    if: ${{ github.actor == 'dependabot[bot]' }}
    steps:
      - uses: actions/checkout@v3
      - uses: kachick/my-new-action@v1
        timeout-minutes: 15
```

## NOTE - Motivation to create own template

[actions/typescript-action](https://github.com/actions/typescript-action) is the official template.\
However, it does not seem to be updated often.\
And applied my favorite environment preparations.
