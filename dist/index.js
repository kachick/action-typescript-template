
    import path from 'path';
    import { fileURLToPath } from 'url';
    import { createRequire as topLevelCreateRequire } from 'module';
    const require = topLevelCreateRequire(import.meta.url);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
        

// src/main.ts
import {
  debug,
  info,
  getInput,
  getBooleanInput,
  setSecret,
  setFailed,
  isDebug,
  startGroup,
  endGroup,
  error
} from "@actions/core";
import { getOctokit, context } from "@actions/github";

// src/github-api.ts
async function fetchJobIDs(octokit, params) {
  return new Set(
    await octokit.paginate(
      octokit.rest.actions.listJobsForWorkflowRun,
      {
        ...params,
        per_page: 100,
        filter: "latest"
      },
      (resp) => resp.data.map((job) => job.id)
    )
  );
}

// src/wait.ts
import { setTimeout } from "timers/promises";
var wait = setTimeout;

// src/main.ts
async function run() {
  startGroup("Setup variables");
  const {
    repo: { repo, owner },
    payload,
    runId,
    sha
  } = context;
  const pr = payload.pull_request;
  let commitSha = sha;
  if (pr) {
    const { head: { sha: prSha = sha } } = pr;
    if (typeof prSha === "string") {
      commitSha = prSha;
    } else {
      if (isDebug()) {
        debug(JSON.stringify(pr, null, 2));
      }
      error("github context has unexpected format: missing context.payload.pull_request.head.sha");
      setFailed("unexpected failure occurred");
      return;
    }
  }
  info(JSON.stringify({ triggeredCommitSha: commitSha, ownRunId: runId }, null, 2));
  const repositoryInfo = {
    owner,
    repo
  };
  const isEarlyExit = getBooleanInput("early-exit", { required: true, trimWhitespace: true });
  const isDryRun = getBooleanInput("dry-run", { required: true, trimWhitespace: true });
  const githubToken = getInput("github-token", { required: true, trimWhitespace: false });
  setSecret(githubToken);
  const octokit = getOctokit(githubToken);
  endGroup();
  if (isDryRun || isEarlyExit) {
    return;
  }
  await wait(42);
  startGroup("Get own job_id");
  const ownJobIDs = await fetchJobIDs(octokit, { ...repositoryInfo, run_id: runId });
  info(JSON.stringify({ ownJobIDs: [...ownJobIDs] }, null, 2));
  endGroup();
}
void run();
