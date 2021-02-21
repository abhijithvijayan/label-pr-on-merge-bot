/**
 *  label-pr-on-merge-bot
 *
 *  @author   abhijithvijayan <https://abhijithvijayan.in>
 *  @license  MIT License
 */

import * as github from '@actions/github';
import * as core from '@actions/core';

import {addLabels, getPrNumber} from './utils';

enum BotInput {
  GITHUB_TOKEN = 'GITHUB_TOKEN',
  MERGED_LABEL = 'merged_label',
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

    const mergedLabel: string = core.getInput(BotInput.MERGED_LABEL).trim();
    // check if bot should run
    if (
      pullRequest.labels.findIndex(
        (existingLabel) => existingLabel.name === mergedLabel
      ) !== -1
    ) {
      console.log('Pull request already has the label, exiting');

      return;
    }

    // Add post-merge label to PR
    await addLabels(octokit, prNumber, [mergedLabel]);
    console.log('Label added to pull request');
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
