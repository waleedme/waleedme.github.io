---
layout: default
title: Vacuum Frenzy — Juicy Physics Pickups
---

[← Back to Projects](/projects)

# Vacuum Frenzy — Juicy Physics Pickups
**Role:** Gameplay • **Engine:** Unity • **Language:** C#  
**Highlights:** Trajectory curves, random drift, pooling, smoothed rotations

## Overview
"Shake to drop" spawns 5 fruits across branches with spacing, **non-linear arcs**, and soft landing (no yo-yo feel).

## Technique
- `AnimationCurve` to shape height over time.  
- Random left/right drift for variety.  
- Smoothly align X rotation on ground contact (no snap).

## Snippet
```csharp
public AnimationCurve heightCurve; // editable in Inspector
public float lateralDistance = 1.2f;

IEnumerator ArcDrop(Transform item, Vector3 start, Vector3 end, float duration) {
    float t = 0f;
    Vector3 lateral = Vector3.right * Random.Range(-lateralDistance, lateralDistance);
    end += lateral;
    Quaternion startRot = item.rotation;
    while (t < 1f) {
        t += Time.deltaTime / duration;
        float h = heightCurve.Evaluate(t);
        Vector3 pos = Vector3.Lerp(start, end, t);
        pos.y += h;
        item.position = pos;
        yield return null;
    }
    // smooth settle
    float s = 0f;
    while (s < 1f) {
        s += Time.deltaTime * 2f;
        item.rotation = Quaternion.Slerp(startRot, Quaternion.Euler(0, item.eulerAngles.y, item.eulerAngles.z), s);
        yield return null;
    }
}
```

**Links:** [Repo](#) · [APK/TestFlight](#) · [Demo Video](#)
