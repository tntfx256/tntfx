import { exec } from "./cmd";

export async function hasUncommittedChanges(cwd: string) {
  const uncommittedChanges = await exec(`git status -s`, { cwd });
  return !!uncommittedChanges;
}

export async function hasUnPushedCommit(cwd: string, branch: string) {
  const unPushedCommits = await exec(`git log --stat ${branch}..HEAD`, { cwd });
  return !!unPushedCommits;
}

export async function checkBranch(cwd: string, branch: string) {
  const currentBranch = await exec(`git branch --show-current`, { cwd });
  const branches = await exec(`git branch`, { cwd });
  const branchExists = branches.includes(branch);

  return {
    branchExists,
    currentBranch,
    isOnTheTargetBranch: currentBranch === branch,
  };
}

export async function getCommitHashes(cwd: string, branch: string) {
  const currentBranch = await exec(`git branch --show-current`, { cwd });
  if (currentBranch !== branch) {
    await exec(`git checkout ${branch}`, { cwd });
  }
  const hashes = await exec(`git log --oneline`, { cwd, interactive: false });
  if (currentBranch !== branch) {
    await exec(`git checkout ${currentBranch}`, { cwd });
  }
  return hashes.split("\n");
}

export async function getLatestTags(cwd: string) {
  await exec(`git fetch --all`, { cwd });

  const tags = await exec(`git tag --list --sort=version:refname`);
  return tags.split("\n");
}
