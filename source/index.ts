/**
 *  label-pr-on-merge-bot
 *
 *  @author   abhijithvijayan <https://abhijithvijayan.in>
 *  @license  MIT License
 */

import core from '@actions/core';

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('GITHUB_TOKEN');
    const triggerLabel: string = core.getInput('label');
    const postMergedLabel: string = core.getInput('post_merged_label');
    console.log({token, triggerLabel, postMergedLabel});

    core.setOutput('time', new Date().toTimeString());
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
