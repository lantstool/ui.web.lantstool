import { test, expect } from '@playwright/test';
import fs from 'fs';

// Helper to inject an old database into the browser's OPFS
async function seedOutdatedDatabase(page, filePath) {
  // Read the raw SQLite file from the disk and convert to Base64
  const buffer = fs.readFileSync(filePath);
  const base64Data = buffer.toString('base64');

  // Go to a blank page on the same domain to get access to OPFS
  // without triggering the React app initialization yet
  await page.goto('/404');

  // Run script inside the browser to write the file into OPFS
  await page.evaluate(async (base64) => {
    const binaryStr = atob(base64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle('lantstool.sqlite', { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(bytes);
    await writable.close();
  }, base64Data);
}

test.describe('Backup Restoration & Manual migration', () => {
  test('Manual migration, creates backup, and redirects to main app', async ({
    page,
  }) => {
    // 1. Enable logging for debugging
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.log(`[Browser Error]: ${msg.text()}`);
    });
    page.on('worker', (worker) => {
      worker.on('pageerror', (error) => console.error(`[Worker Error]: ${error.message}`));
    });
    // 2. Put a v0 DB into OPFS before the app starts
    await seedOutdatedDatabase(page, 'tests/lantstool.sqlite');
    // 3. Open the app. The initApp effect should detect the old DB version
    await page.goto('/');
    // 4. Verify the Migration Screen is displayed with the correct UI from Migration.jsx
    await expect(page.getByRole('heading', { name: 'Database Update Required' })).toBeVisible();
    // 5. Prepare to intercept the backup file download
    const downloadPromise = page.waitForEvent('download');
    // 6. Click the "Create backup" button (which triggers startMigrations)
    const createBackupBtn = page.getByRole('button', { name: 'Create backup' });
    await expect(createBackupBtn).toBeEnabled();
    await createBackupBtn.click();
    // 7. Wait for the backup file to be generated and downloaded
    const download = await downloadPromise;
    // Verify it's actually a ZIP file being downloaded
    expect(download.suggestedFilename()).toMatch(/\.zip$/);
    // 8. Wait for the migrations to finish and the app to redirect
    await page.waitForURL('**/spaces', { timeout: 15000 });
    // 9. Verify the migration screen is gone
    await expect(page.getByRole('heading', { name: 'Database Update Required' })).toBeHidden();
    // 10. Confirm the user successfully entered the main application
    await expect(page.getByRole('heading', { name: 'Spaces' })).toBeVisible();
  });


  test('Restoring v0.backup silently migrates DB and redirects to main app', async ({ page }) => {
    // 1. Enable logging to catch browser and worker errors during the test
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.log(`[Browser Error]: ${msg.text()}`);
    });
    page.on('worker', (worker) => {
      worker.on('pageerror', (error) => console.error(`[Worker Error]: ${error.message}`));
    });
    // 2. Open the initial onboarding page
    await page.goto('/get-started');
    // 3. Locate and click the "Restore backup" button on the onboarding screen
    await page.getByRole('button', { name: 'Restore backup' }).click();
    // 4. Ensure the restoration modal is fully open and visible
    await expect(page.getByRole('heading', { name: 'Restore from backup' })).toBeVisible();
    // 5. Verify that the final "Restore" button is disabled before a file is selected
    const finalRestoreBtn = page.getByRole('button', { name: 'Restore', exact: true });
    await expect(finalRestoreBtn).toBeDisabled();
    // 6. Provide the mocked backup file to the hidden dropzone input
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/v0.backup.zip');
    // 7. Verify the dropzone successfully processed the file and enabled the "Restore" button
    await expect(finalRestoreBtn).toBeEnabled();
    // 8. Click the enabled "Restore" button to initiate the restoration process
    await finalRestoreBtn.click();
    // 9. Wait for the successful redirect to the main app.
    // During this time, the worker unpacks the archive, validates the DB,
    // runs silent migrations, replaces the SQLite file, and redirects the user.
    await page.waitForURL('**/spaces', { timeout: 15000 });
    // 10. Verify that the manual migration overlay did not appear
    const migrationOverlay = page.getByText('Database Update Required');
    await expect(migrationOverlay).toBeHidden();
    // 11. Confirm that the user successfully entered the main application
    await expect(page.getByRole('heading', { name: 'spaces' })).toBeVisible();
  });
});
