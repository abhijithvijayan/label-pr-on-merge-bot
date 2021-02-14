/**
 *  label-pr-on-merge-bot
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 */

const core = require('@actions/core');
const github = require('@actions/github');

try {
  const token = core.getInput('GITHUB_TOKEN');
  const triggerLabel = core.getInput('label');
  const postMergedLabel = core.getInput('post_merged_label');
  console.log({token, triggerLabel, postMergedLabel});

  const time = new Date().toTimeString();
  core.setOutput('time', time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
