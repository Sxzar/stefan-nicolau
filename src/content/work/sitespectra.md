---
title: Sitespectra
description: >-
  **Sitespectra** is an advanced website audit tool currently under active
  development. Designed to run locally, it provides deep insights into a
  website’s performance, content structure, SEO readiness, security
  configuration, and even linguistic quality. Built from scratch with the goal
  of combining Lighthouse audits, crawler-style exploration, and external
  authority data into a unified dashboard, this tool is targeted at developers,
  technical SEOs, and growth-focused teams.


  The motivation behind Sitespectra was to build something as thorough as Screaming Frog but with a friendlier interface and extended capabilities like live spellchecking and structured data validation — all while giving the user full control over when and how data is pulled and stored.


  Check example response on [GitHub](https://github.com/Sxzar/sitespectra-public)
task: |-
  * Local-first architecture for privacy and speed
  * In-depth crawling with Puppeteer to capture:

    * All internal/external links, images, media, JS, CSS, fonts, and plugins
    * Canonicals, metas, structured data, sitemap links, and headers
  * Full Lighthouse integration with CLI control and JSON output
  * Built-in spellcheck via LanguageTool
  * Visual report interface with Recharts
  * Export to PDF via `html2pdf.js`
  * Dark/light mode UI
  * Extensive use of Radix UI for clean interactions
projectClient: Personal
projectDate: 2025-06-16T07:33:34.752Z
author: Stefan Nicolau
date: 2025-06-16T07:33:34.757Z
tags:
  - fullstack
  - ux/ui
  - next.js
  - ""
image: /assets/images/work/sitespectra.jpg
imageAlt: Sitespectra - preview
---
I led all aspects of the project:

* Engineered the **CLI + Puppeteer crawler** to extract page-level information such as asset types, headers, canonical tags, sitemaps, structured data, and language declarations
* Integrated **Lighthouse** to generate full performance reports in JSON
* Implemented **LanguageTool API** to scan all visible text for spelling and grammar issues
* Built a custom **dashboard interface** using Next.js, Tailwind CSS, and Recharts
* Connected multiple APIs for fetching **WHOIS data**, **SSL info**, **backlink stats**, and **domain ratings.**



### Optimization & Scalability

* Optimized Puppeteer scripts for batch processing large websites
* Semantic, accessible markup with Tailwind + DaisyUI
* ISO code-based language and country mapping
* Decoupled data modules for future API integrations or remote storage

This is an ongoing personal project and is currently used locally for testing and private analysis. The repository is private due to plans for future monetization, but a GitHub-hosted example JSON response will be made available for those interested in exploring the output format and capabilities.