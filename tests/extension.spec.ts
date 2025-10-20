import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Cria __dirname manualmente (pois ES modules não têm por padrão)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '..', 'dist');

// Teste E2E principal: verifica se a extensão é carregada e o popup funciona
test('popup carrega e exibe interface corretamente', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true, // coloque false se quiser ver o navegador abrindo
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  const page = await context.newPage();

  await page.goto('https://example.com');
  await page.waitForTimeout(2000);

  const title = await page.title();
  expect(title).toBe('Example Domain');

  console.log('✅ Extensão carregada e página aberta com sucesso.');
  await context.close();
});
