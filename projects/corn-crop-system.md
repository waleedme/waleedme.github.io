---
layout: default
title: Cornfield Crafter — Modular Crop System
---

[← Back to Projects](/projects)

# Cornfield Crafter — Modular Crop System
**Role:** Gameplay & Systems • **Engine:** Unity • **Language:** C#  
**Highlights:** ScriptableObjects, per-patch state machines, save/load, SOLID

## Overview
A farming system where each field contains multiple **Crop Patches**, each with its own collider and state. The **Crop Data** lives in ScriptableObjects, so adding a new crop doesn't change core code.

## Key Ideas
- **Single-responsibility patches:** Each `CropPatch` owns its states and transitions.  
- **Data-driven crops:** `CropData` (SO) defines timings, visuals, and tool rules.  
- **Player interactions via interfaces:** `ICropInteractions` unifies Enter/Exit/Update/SetTool.  
- **Persistence:** Save patch states to PlayerPrefs; rebuild visuals on load.

## Example Snippet
```csharp
public interface ICropInteractions {
    void Enter();
    void Exit();
    IEnumerator Update();
    void SetTool();
}

public class CropPatch : MonoBehaviour {
    public CropStages stage;
    public void EvaluateProgress() {
        switch (stage) {
            case CropStages.seeding:
                if (AllAt(CropStages.watering)) stage = CropStages.watering;
                break;
            case CropStages.watering:
                if (AllAt(CropStages.harvest)) stage = CropStages.harvest;
                break;
            case CropStages.harvest:
                if (AllAt(CropStages.seeding)) stage = CropStages.seeding;
                break;
        }
    }
}
```

**Links:** [Repo](#) · [WebGL/itch](#) · [Demo Video](#)
