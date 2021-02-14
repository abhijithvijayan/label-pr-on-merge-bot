/**
 *  label-pr-on-merge-bot
 *
 *  @author   abhijithvijayan <https://abhijithvijayan.in>
 *  @license  MIT License
 */

import * as github from '@actions/github';
import * as core from '@actions/core';

import {addLabels, getPrNumber, removeLabels} from './utils';

enum BotInput {
  GITHUB_TOKEN = 'GITHUB_TOKEN',
  TRIGGER_LABEL = 'label',
  POST_MERGE_LABEL = 'post_merged_label',
}

async function run(): Promise<void> {
  try {
    const prNumber = getPrNumber();
    if (!prNumber) {
      console.log('Could not get pull request number from context, exiting');

      return;
    }

    const token: string = core.getInput(BotInput.GITHUB_TOKEN);
    const octokit = github.getOctokit(token);

    // get current pull request
    const {data: pullRequest} = await octokit.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prNumber,
    });

    const triggerLabel: string = core.getInput(BotInput.TRIGGER_LABEL).trim();
    // check if bot should run
    if (
      pullRequest.labels.findIndex(
        (existingLabel) => existingLabel.name === triggerLabel
      ) === -1
    ) {
      console.log("Pull request doesn't have the trigger label, exiting");

      return;
    }

    const postMergedLabel: string = core
      .getInput(BotInput.POST_MERGE_LABEL)
      .trim();
    // Add post-merge label to PR
    await addLabels(octokit, prNumber, [postMergedLabel]);
    console.log('Label added to pull request');

    await removeLabels(octokit, prNumber, [triggerLabel]);
    console.log('Removed bot trigger label from pull request, exiting');

    core.setOutput('time', new Date().toTimeString());
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
