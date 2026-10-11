# Berged Atelier — by Bergedo

A responsive first prototype for a garment-design workspace. This prototype is intentionally isolated under `atelier/` and on the `berged-atelier-start` branch so it does not replace the existing Berged app.

## Run it

No build tools or API keys are required for this prototype:

1. Download this repository's `berged-atelier-start` branch as a ZIP.
2. Extract the ZIP.
3. Open `atelier/index.html` in a modern browser.

The interface is designed to work on desktop and mobile. Some browser features, such as local project saving, depend on browser settings.

## Working in this prototype

- Garment type selection: sweatshirt, jacket, sweatpants, T-shirt.
- Garment-specific options for fit, fabric, color, pockets, closure/neckline, hem, and surface detail.
- Conditional hood and drawcord controls for hooded garments.
- Optional brand label toggle.
- Reference image preview (image is not uploaded to a server).
- A schematic vector preview that changes with selected options.
- Basic local-language chat commands for a few common details.
- Export a TXT design summary and SVG schematic.
- Save/reopen the last project in the same browser.

## Important limitations

This is a user-interface and rule-based prototype, not a trained AI model. The chat uses simple rules, not a language model. Uploaded reference images are previewed locally and are not analyzed by AI. The SVG is a schematic preview, not a manufacturing pattern. Measurements, grading, seam allowances, fabric behavior, and samples must be verified by a qualified pattern maker before production.

## Next milestones

1. Make the question system data-driven and expand garment details.
2. Add complete size-spec tables and editable measurement tolerances.
3. Generate a more complete tech-pack PDF with materials, trims, construction notes, and front/back flats.
4. Add project accounts and server-side storage.
5. Build a licensed training-data pipeline and evaluate a self-hosted visual model separately from the technical-drawing engine.

## Product principle

Berged Atelier should not claim AI-generated or factory-ready outputs until those capabilities have actually been built and tested.