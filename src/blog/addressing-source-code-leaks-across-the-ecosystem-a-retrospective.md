---
title: Addressing Source Code Leaks Across the Ecosystem – A Retrospective
date: 2025-08-02
ogpImage: /ogp-image/addressing-source-code-leaks-across-the-ecosystem.png
---

<small>

🌐 [この記事を日本語で読む](https://zenn.dev/sapphi_red/articles/49d6493e593200)

</small>

::: tip Note

This article took six months to be published for reasons described later, so some parts may seem unnatural to read now.

:::

My 2025 kicked off with handling vulnerabilities in Vite and reporting it to other tools in the ecosystem.
This blog post is a retrospective on that experience.
This post primarily focuses on the non-technical side; if you are interested in the technical side, please refer to the post I plan to write next (_Update: [I wrote it](/blog/local-server-security-best-practices)._).

## The report to Vite

On January 9, right after the New Year holidays in Japan, a vulnerability report was submitted to Vite ([`GHSA-vg6x-rcgg-rjx6` / `CVE-2025-24010`](https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6)).
The report stated that Vite's WebSocket server is vulnerable to a Cross-Site WebSocket Hijacking (CSWSH) attack ([CWE-1385](https://cwe.mitre.org/data/definitions/1385.html)), which could allow source code to be leaked. (Note: The content of the report has been changed from when it was originally submitted).
While it was true that Vite's WebSocket server was vulnerable to CSWSH attacks, the actual reason source code could be leaked was that Vite enabled [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) by default.
However, requiring users to configure CORS even during development would add one more thing for Vite users to worry about when starting a project.
I wanted to avoid this if possible.
So I decided to investigate the configs of the following tools to see how they handle this issue.

- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [Parcel](https://github.com/parcel-bundler/parcel)
- [esbuild](https://github.com/evanw/esbuild)
- [create-react-app](https://github.com/facebook/create-react-app)
- [Vue CLI](https://github.com/vuejs/vue-cli)
- [Next.js](https://github.com/vercel/next.js)

However, all tools except for webpack-dev-server and Vue CLI allowed CORS, making it possible to leak the source code.
During this investigation, I found [an article stating that webpack-dev-server had changed its default CORS settings](https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a).
I also realized we were vulnerable to the DNS rebinding attack mentioned in that article.
I decided to work on a fix for Vite, referencing the implementation in webpack-dev-server.

## Investigating and Fixing Each Vulnerability

At this point, I understood there were three vulnerabilities, so I considered the conditions under which each could be exploited.
Then, while checking the webpack-dev-server implementation, I thought about whether I had missed anything.
It was then that I noticed a flaw in the webpack-dev-server implementation.

I created the pull request to Vite with that flaw corrected.
Since Vite cannot know if the origin of a request is trustworthy, a breaking change was unavoidable.
I was mindful of two things:

- Minimize the impact of the breaking change on users.
- Include clear instructions in the report for affected users on what to do.

For the former, I made it so that access is allowed by default if it's not affected by the attack.
For the latter, I listed the newly required settings for each use case for the update in the report, and also made each change opt-outable for users who could accept the security risks.

After that, I wrote up the report and published it along with the release of the fix.

## Follow-up on the Fix Release

There was an unavoidable breaking change in a semi-public, semi-private API, and I had noticed via GitHub search that some repositories were using it. I reported this to those repositories ([wxt-dev/wxt#1360](https://github.com/wxt-dev/wxt/issues/1360), [quasarframework/quasar#17777](https://github.com/quasarframework/quasar/issues/17777)).
This was because if the update was blocked, it would diminish the purpose of releasing the change in a patch version.

After the release, two issues related to the fix were created.
[@bluwy](https://github.com/bluwy) and [@patak-dev](https://github.com/patak-dev) fixed one of them and released a patch.
The other was closed because, literally, no one provided a reproduction, making investigation impossible ([vitejs/vite#19242](https://github.com/vitejs/vite/issues/19242)).
I tried to reproduce it, repeatedly stated in the issue that a reproduction was necessary, and even explained the impact of the vulnerability, but the only comments were "it doesn't work, fix it." It was very disheartening.

I also left correction comments on downstream PRs I found ([ddev/ddev.com#313](https://github.com/ddev/ddev.com/pull/313#pullrequestreview-2595295426), [storybookjs/storybook#30432](https://github.com/storybookjs/storybook/pull/30432#issuecomment-2636338887)).
From these PRs and other issues ([vitejs/vite#19287](https://github.com/vitejs/vite/discussions/19287), [vitejs/vite#19345](https://github.com/vitejs/vite/issues/19345)), I gathered that the current state was not clear, so I [improved the documentation](https://github.com/vitejs/vite/pull/19378).
I believe the current documentation now clarifies what settings are needed ([`server.allowedHosts` in the docs](https://vite.dev/config/server-options.html#server-allowedhosts), [`server.cors`](https://vite.dev/config/server-options.html#server-cors)).

## Reporting to Other Tools

I reported the vulnerabilities I found in various tools while fixing the vulnerability in Vite and reviewing the fix for a vulnerability in Vitest.
The summaries of each vulnerability are as follows.

- webpack-dev-server
  - [`GHSA-4v9v-hfq4-rm2v` / `CVE-2025-30359`](https://github.com/webpack/webpack-dev-server/security/advisories/GHSA-4v9v-hfq4-rm2v): the source code can be leaked by accessing a malicious website while the dev server running if the user uses a predictable output path for the entrypoint script
  - [`GHSA-9jgg-88mc-972h` / `CVE-2025-30360`](https://github.com/webpack/webpack-dev-server/security/advisories/GHSA-9jgg-88mc-972h): the source code can be leaked by accessing a malicious website while the user edits a file and the dev server running if the user uses a non-Chromium browser
- Parcel
  - Reported, but no CVE has been assigned, and the [fix pull request](https://github.com/parcel-bundler/parcel/pull/10138) has not been merged yet.
- esbuild
  - [`GHSA-67mh-4wv8-2f99`](https://github.com/evanw/esbuild/security/advisories/GHSA-67mh-4wv8-2f99): the source code can be leaked by accessing a malicious website while the dev server running
- Next.js
  - [`GHSA-3h52-269p-cp9r` / `CVE-2025-48068`](https://github.com/vercel/next.js/security/advisories/GHSA-3h52-269p-cp9r): Information exposure in Next.js dev server due to lack of origin verification
    - CSWSH vulnerability
  - `GHSA-mg8j-9gcq-6rrw`: Source code of client components may be stolen during dev when turbopack is not enabled and you open a malicious web site
    - Similar vulnerability to `GHSA-4v9v-hfq4-rm2v` / `CVE-2025-30359`
    - Merged into and published as `GHSA-3h52-269p-cp9r` / `CVE-2025-48068`
  - `GHSA-cj77-9qv9-v479`: Source code may be stolen when you access a malicious web site when turbopack is not enabled.
    - Vulnerability where CORS for sourcemaps is allowed
    - Merged into and published as `GHSA-3h52-269p-cp9r` / `CVE-2025-48068`
- Nuxt
  - [`GHSA-2452-6xj8-jh47` / `CVE-2025-24360`](https://github.com/nuxt/nuxt/security/advisories/GHSA-2452-6xj8-jh47): the source code can be leaked by accessing a malicious website while the dev server running if the user is using Vite builder
  - [`GHSA-4gf7-ff8x-hq99` / `CVE-2025-24361`](https://github.com/nuxt/nuxt/security/advisories/GHSA-4gf7-ff8x-hq99): the source code can be leaked by accessing a malicious website while the dev server running if the user is using Webpack / Rspack builder
- Vitest
  - [`GHSA-9crc-q9x8-hgqq` / `CVE-2025-24964`](https://github.com/vitest-dev/vitest/security/advisories/GHSA-9crc-q9x8-hgqq): arbitrary remote code execution was possible while the Vitest API server is listening
  - [`GHSA-8gvc-j273-4wm5` / `CVE-2025-24963`](https://github.com/vitest-dev/vitest/security/advisories/GHSA-8gvc-j273-4wm5): any file was accessible from outside while the Vitest API server is listening
- playwright
  - Reported, but no CVE has been assigned. There was a vulnerability that allowed arbitrary file reading because CORS was enabled.

I strongly recommend updating each tool promptly.

Please note that there are some points of caution for each tool.

- create-react-app: I did not report this because [it is by design that it allows fetching from external sites](https://github.com/facebook/create-react-app/blob/19fa58d527ae74f2b6baa0867463eea1d290f9a5/packages/react-scripts/config/webpackDevServer.config.js#L28-L51). Therefore, if you are using create-react-app, you must be careful not to include sensitive information in your source code.
- webpack-dev-server: After the fix in v5.2.1, a [change included in v5.2.2](https://github.com/webpack/webpack-dev-server/pull/5510) allows source code to be fetched from external sites for hosts included in `allowedHosts`. If you use `allowedHosts`, you need to carefully determine if this is acceptable.
- Next.js: Although not mentioned in the initial published report, you need to set the `allowedDevOrigins` option to prevent these attacks. If you have not set it, I strongly recommend doing so.

## Final Thoughts

I want to thank the team members who gave me feedback on the vulnerability fixes and helped with follow-up fixes.
I also thank the downstream maintainers who were affected by the breaking changes and handled the fix.

Honestly, some reports took six months from reporting to fix and disclosure, so I slightly regret reporting a few of them. However, most were fixed, so I'll consider it "all's well that ends well."

I hope that my reports have helped improve the security of front-end tools.
As the [Private Network Access](https://github.com/WICG/private-network-access) proposal progresses, attacks will become more difficult, so I hope this proposal will advance.

## Timeline

### Vite

- 2025-01-09: The report was submitted.
- 2025-01-10: I investigated other tools.
- 2025-01-14: I finished grasping the full picture of the vulnerabilities and wrote up a fix proposal.
- 2025-01-15: I started implementing the proposed fix.
- 2025-01-20: Released v6.0.9, v5.4.12, and v4.5.6 containing the fix.
- 2025-01-20: Published the CVE and report.

### Reporting to other tools

- webpack-dev-server
  - 2025-01-14: I reported via GitHub's private vulnerability reporting feature.
  - 2025-01-20: I sent an email about the report.
  - 2025-01-26: I sent a DM on X to a Webpack team member and received their response.
  - 2025-03-17: I created a fix PR.
  - 2025-03-25: The PR was reviewed and merged.
  - 2025-03-27: v5.2.1 containing the fix was released (2.5 months after reporting).
  - 2025-06-04: The CVE and the report were published (4.5 months after reporting).
- Parcel
  - 2025-01-16: I sent a direct message on Discord.
  - 2025-01-26: I created an issue in the repository asking how to contact them.
  - 2025-01-27: I received a response to the issue.
  - 2025-01-28: I sent the report via email.
  - 2025-04-20: A [pull request for the fix](https://github.com/parcel-bundler/parcel/pull/10138) was created.
  - The fix PR is not yet merged or released.
- esbuild
  - 2025-01-16: I sent a private message on Mastodon.
  - 2025-01-26: I created an issue in the repository asking how to contact them.
  - 2025-01-27: I received a response to the issue.
  - 2025-01-28: I reported via GitHub's private vulnerability reporting feature.
  - 2025-01-31: I received a response to the report.
  - 2025-02-07: I received a request to review the fix PR and reviewed it.
  - 2025-02-08: v0.25.0 containing the fix was released.
  - 2025-02-08: The report was published.
- Next.js
  - 2025-01-14: I reported via GitHub's private vulnerability reporting feature.
  - 2025-01-20: I sent an email about the report.
  - 2025-01-21: I received a response to the email.
  - 2025-03-05: I received a message that the work on the fix had begun.
  - 2025-03-07: I received a request to review the fix PR and reviewed it.
  - 2025-05-29: The CVE, report, and blog post were published (4.5 months after reporting).
  - 2025-06-12: The report and blog post were updated to state that the `allowedDevOrigins` setting is required. (5 months after reporting).
- Nuxt
  - 2025-01-23: I reported via GitHub's private vulnerability reporting feature.
  - 2025-01-24: I received a response to the report.
  - 2025-01-25: v3.15.3 containing one of the fixes was released.
  - 2025-01-25: The CVE and the report were published.
  - 2025-01-29: v3.15.4 containing the other fix was released.
- Vitest
  - 2025-01-16: @hiogawa noticed a similar vulnerability in Vitest.
  - 2025-01-17: I was asked to create a report, so I reported it via GitHub's private vulnerability reporting feature.
  - 2025-01-19: A fix PR was created.
  - 2025-01-20: I noticed another vulnerability and reported it via GitHub's private vulnerability reporting feature.
  - 2025-02-03: v3.0.5, v2.1.9, and v1.6.1 containing the fixes were released.
  - 2025-02-04: The CVE and the report were published.
- playwright
  - 2025-01-18: I submitted a report via the Microsoft Security Response Center Researcher Portal and received their response.
  - 2025-01-20: I received a response that it was under investigation.
  - 2025-01-27: The fix commit was made.
  - 2025-01-29: The issue was triaged / closed on the Microsoft Security Response Center Researcher Portal.
  - 2025-03-07: v1.51.0 containing the fix was released.
  - A CVE and the report have not been published.
