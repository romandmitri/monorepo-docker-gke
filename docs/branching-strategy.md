# Branching Strategy

> This is just an example! More complex strategies are also possible depending on complexity of the project and team size.

This strategy uses `rebase` and the target `VERSION` number is know BEFORE release to production.

## Reserved Branches

### `main`

* The branch is **production** branch for https://reppo.cheeseindustries.ca domain.
* Changes are automatically deployed to production.
* Only update this branch via Pull Request from `staging` (or `hotfix`) branch.
* Changes will trigger `version.yml` workflow to `git tag` based on current [VERSION](/VERSION) value.

### `staging`

* This is the `default` branch.
* This is the pending release branch.
* See [Workflow - Release Branch](#workflow) for release workflow.
* Changes on this branch are automatically deployed to `stage` cluster at https://reppo-stage.cheeseindustries.ca domain.
    * WARNING: If `hotfix` branch exists then do NOT merge to `staging` branch to avoid `staging` deployment to cluster.

### `hotfix`

* This branch automatically deployed to `stage` cluster.
* Revert `stage` database to appropriate state BEFORE creating the `hotfix` branch.

## Feature Branches

* Name branch anyway you prefer, ie:
    * `DEV-123-feature`
    * `feature/my-feature`
    * `my-feature`
* Create PRs to target `staging` (or `hotfix`) branch as needed.
    * Rebase feature branch against target before merging, as needed.

```
git checkout feature-branch
git rebase origin/staging -i
git push -f
```

> Feature branches are currently NOT deployed to any cluster.

--- 

## Workflow

Each future release starts with `staging` (or `hotfix`) branch.

To prepare a release branch, start by creating a version commit...

* The version is subjective, but typically...
    * Use `+1` on **minor** value for `staging` branch.
    * Use `+1` on **patch** value for `hotfix` branch.

Example for `staging` branch:

```
git checkout staging
git reset origin/staging --hard
make local-version v=1.2.0
git add .
git commit -am "Version v=1.2.0"
git push
```

> The `staging` branch is automatically rebased against `main` branch.
> This occurs via `version.yml` workflow on `main` branch.

Alternatively, for `hotfix` branch:

> Remember to revert stage database BEFORE creating `hotfix` branch!

```
git checkout main
git checkout -b hotfix
make local-version v=1.2.3
git add .
git commit -am "Version v=1.2.3"
git push -f
```

Next, create a PR from relevant release branch to `main` branch.
