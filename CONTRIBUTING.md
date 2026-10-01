# Contributing

Contributions are welcome. Open an issue before a large change, so that we can agree on the approach.

## Set up

```bash
composer install
npm ci
npx playwright install chromium
```

## Before you open a pull request

1. Add or change a test for each change in behavior.
2. Run the checks:

   ```bash
   composer test
   composer analyse
   composer format
   ```

3. If you changed a file in `resources/js/`, run `npm run build` and commit `dist/`. CI fails when
   `dist/` is not the build output. If you changed a file in `workbench/resources/js/`, run
   `npm run build:workbench` and commit `workbench/resources/dist/`. CI checks it the same way.
4. Add a line to `CHANGELOG.md` for a change that users can see.

One pull request holds one change.
