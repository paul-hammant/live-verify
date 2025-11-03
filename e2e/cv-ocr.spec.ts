import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

function listPairs(dir: string): { png: string; txt: string | null }[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f=>f.endsWith('.png'))
    .map(png=>{
      const base = png.replace(/\.png$/, '');
      const txt = path.join(dir, base + '.txt');
      return { png: path.join(dir, png), txt: fs.existsSync(txt) ? txt : null };
    });
}

async function loadAndOcr(page, pngPath: string) {
  await page.goto('file://' + path.resolve('e2e/cv-harness.html'));
  await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.min.js' });
  await page.evaluate(() => (window as any).waitForCv());

  const buf = fs.readFileSync(pngPath);
  const dataUrl = 'data:image/png;base64,' + buf.toString('base64');
  const result = await page.evaluate(async (dataUrl) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; (img as any).src = dataUrl; });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = (img as any).width; canvas.height = (img as any).height;
    ctx.drawImage(img as any, 0, 0);
    const det = await (window as any).detectSquaresFromCanvas(canvas);
    if (!det.ok) return { ok:false };
    const cropped = det.croppedCanvas;

    // Try OCR at all 4 rotations to debug which one is being chosen
    const rotations = [0, 90, 180, 270];
    const rotationResults = [];

    for (const angle of rotations) {
      // Rotate canvas
      const rotatedCanvas = document.createElement('canvas');
      const rotatedCtx = rotatedCanvas.getContext('2d')!;

      if (angle === 0) {
        rotatedCanvas.width = cropped.width;
        rotatedCanvas.height = cropped.height;
        rotatedCtx.drawImage(cropped, 0, 0);
      } else if (angle === 90) {
        rotatedCanvas.width = cropped.height;
        rotatedCanvas.height = cropped.width;
        rotatedCtx.translate(rotatedCanvas.width, 0);
        rotatedCtx.rotate(Math.PI / 2);
        rotatedCtx.drawImage(cropped, 0, 0);
      } else if (angle === 180) {
        rotatedCanvas.width = cropped.width;
        rotatedCanvas.height = cropped.height;
        rotatedCtx.translate(rotatedCanvas.width, rotatedCanvas.height);
        rotatedCtx.rotate(Math.PI);
        rotatedCtx.drawImage(cropped, 0, 0);
      } else if (angle === 270) {
        rotatedCanvas.width = cropped.height;
        rotatedCanvas.height = cropped.width;
        rotatedCtx.translate(0, rotatedCanvas.height);
        rotatedCtx.rotate(-Math.PI / 2);
        rotatedCtx.drawImage(cropped, 0, 0);
      }

      const { data } = await (window as any).Tesseract.recognize(rotatedCanvas.toDataURL(), 'eng');
      rotationResults.push({
        angle,
        text: data.text,
        confidence: data.confidence,
        imageData: rotatedCanvas.toDataURL()
      });
    }

    // Find best confidence
    const best = rotationResults.reduce((a, b) => a.confidence > b.confidence ? a : b);

    return {
      ok: true,
      text: best.text,
      croppedImageData: cropped.toDataURL(),
      rotationResults,
      chosenRotation: best.angle,
      chosenConfidence: best.confidence
    };
  }, dataUrl);

  // Save cropped image and all rotation attempts for debugging
  if (result.ok) {
    const basename = path.basename(pngPath, '.png');
    const tmpDir = path.join(__dirname, '../tmp');
    fs.mkdirSync(tmpDir, { recursive: true });

    // Save original cropped image
    if (result.croppedImageData) {
      const base64Data = result.croppedImageData.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const outputPath = path.join(tmpDir, `cropped-cv-ocr-${basename}.png`);
      fs.writeFileSync(outputPath, buffer);
      console.log(`💾 Saved cropped image to ${outputPath}`);
    }

    // Save all 4 rotation attempts
    if (result.rotationResults) {
      console.log(`\n🔄 OCR Rotation Results for ${basename}:`);

      // Save confidence scores summary
      const confidenceSummary = result.rotationResults.map(rot =>
        `${rot.angle}°: confidence=${rot.confidence.toFixed(2)} ${rot.angle === result.chosenRotation ? '✅ CHOSEN' : ''}`
      ).join('\n');
      const confidencePath = path.join(tmpDir, `cropped-cv-ocr-${basename}-confidence.txt`);
      fs.writeFileSync(confidencePath, confidenceSummary, 'utf-8');

      for (const rot of result.rotationResults) {
        const base64Data = rot.imageData.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const outputPath = path.join(tmpDir, `cropped-cv-ocr-${basename}-rot${rot.angle}.png`);
        fs.writeFileSync(outputPath, buffer);

        // Save text output
        const textOutputPath = path.join(tmpDir, `cropped-cv-ocr-${basename}-rot${rot.angle}.txt`);
        fs.writeFileSync(textOutputPath, rot.text, 'utf-8');

        console.log(`  ${rot.angle}°: confidence=${rot.confidence.toFixed(2)} text="${rot.text.substring(0, 50)}..." ${rot.angle === result.chosenRotation ? '✅ CHOSEN' : ''}`);
      }
    }
  }

  return result;
}

test.describe('OCR of cropped region (browser)', () => {
  const roots = [
    'test/fixtures/should-detect',
    'test/fixtures/mixed',
  ];

  for (const root of roots) {
    for (const pair of listPairs(root)) {
      test(path.relative('.', pair.png), async ({ page }) => {
        const res: any = await loadAndOcr(page, pair.png);
        expect(res.ok).toBeTruthy();
        if (pair.txt) {
          const expected = fs.readFileSync(pair.txt, 'utf8').replace(/\r?\n/g, '\\n');
          const actualRaw = (res.text as string).replace(/\r?\n/g, '\\n');
          const actual = actualRaw
            .split('\\n')
            .map(l => l.replace(/^\s+|\s+$/g,'').replace(/\s+/g, ' '))
            .join('\\n');
          expect(actual).toBe(expected);
        }      });
    }
  }

  for (const pair of listPairs('test/fixtures/should-not-detect')) {
    test(path.relative('.', pair.png), async ({ page }) => {
      const res: any = await loadAndOcr(page, pair.png);
      expect(res.ok).toBeFalsy();
    });
  }
});
