#!/usr/bin/env node

/**
 *  node-cli-ts-starter
 *
 *  @author   abhijithvijayan <https://abhijithvijayan.in>
 *  @license  MIT License
 */

import github from '@actions/github';
import core from '@actions/core';

try {
  const token: string = core.getInput('GITHUB_TOKEN');
  const triggerLabel: string = core.getInput('label');
  const postMergedLabel: string = core.getInput('post_merged_label');
  console.log({token, triggerLabel, postMergedLabel});

  const time = new Date().toTimeString();
  core.setOutput('time', time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
