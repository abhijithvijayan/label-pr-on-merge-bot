import * as github from '@actions/github';

export function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

export async function addLabels(
  client: any,
  prNumber: number,
  labels: string[]
): Promise<void> {
  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels,
  });
}

export async function removeLabels(
  client: any,
  prNumber: number,
  labels: string[]
): Promise<void> {
  await Promise.all(
    labels.map((label) =>
      client.issues.removeLabel({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: prNumber,
        name: label,
      })
    )
  );
}
