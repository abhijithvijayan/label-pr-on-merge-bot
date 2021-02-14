#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = __importDefault(require("@actions/github"));
const core_1 = __importDefault(require("@actions/core"));
try {
    const token = core_1.default.getInput('GITHUB_TOKEN');
    const triggerLabel = core_1.default.getInput('label');
    const postMergedLabel = core_1.default.getInput('post_merged_label');
    console.log({ token, triggerLabel, postMergedLabel });
    const time = new Date().toTimeString();
    core_1.default.setOutput('time', time);
    const payload = JSON.stringify(github_1.default.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
}
catch (error) {
    core_1.default.setFailed(error.message);
}
