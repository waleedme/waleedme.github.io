---
layout: default
title: IAP with 3-Month Free Trial
---

[← Back to Projects](/projects)

# IAP with 3-Month Free Trial (Play Store)
**Role:** Monetization • **Tech:** Unity IAP  
**Highlights:** Trial setup in Play Console, entitlement checks, (optional) server validation

## Overview
Implements a 3-month free trial that auto-renews. Client checks entitlement and updates UI state.

## Snippet (outline)
```csharp
public class SubManager : IStoreListener {
    const string SUB_ID = "com.yourgame.premium";
    public void OnInitialized(IStoreController controller, IExtensionProvider extensions) {
        // Query receipts & entitlement, then toggle UI ("Goat Pass" active)
    }
}
```

**Links:** [Repo](#) · [Play Console Notes](#)
