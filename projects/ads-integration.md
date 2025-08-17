---
layout: default
title: Google Mobile Ads Integration
---

[← Back to Projects](/projects)

# Google Mobile Ads Integration
**Role:** Monetization • **Tech:** Google Mobile Ads SDK (AdMob)  
**Highlights:** Paid event hooks, analytics mapping, failover handling

## Overview
Clean ad lifecycle callbacks (loaded, opened, closed, failed) → analytics events for funnels/cohorts.

## Snippet
```csharp
void RegisterInterstitial(InterstitialAd ad) {
    ad.OnAdFullScreenContentOpened += (_, __) => Analytics.LogEvent("ad_open", "format", "interstitial");
    ad.OnAdFullScreenContentFailed += (_, err) => Analytics.LogEvent("ad_fail", "format", "interstitial", "msg", err.ToString());
    ad.OnAdFullScreenContentClosed += (_, __) => Analytics.LogEvent("ad_close", "format", "interstitial");
}
```

**Links:** [Repo](#) · [Doc Notes](#)
