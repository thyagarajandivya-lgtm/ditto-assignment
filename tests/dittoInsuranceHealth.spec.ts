import { test, expect } from '@playwright/test';
import { DittoFqPage } from '../pages/dittoFq.page';
import { parseAmount } from '../utils/premiumUtils';



test('Ditto Insurance Health', async ({ page }) => {
    const ditto = new DittoFqPage(page);
    await ditto.navigate();
    await ditto.selectPlan();
    await ditto.fillMemberDetails('30', '560001');
    
    const slider = page.locator('[role="slider"]');
    await slider.focus();

    while ((await slider.getAttribute('aria-valuenow')) !== '2500000') {await page.keyboard.press('ArrowRight');
    }

    await ditto.calculatePremium();
   
    await page.waitForLoadState('networkidle');
    
    const base = parseAmount(await ditto.basePremium().textContent());
    const addon = parseAmount(await ditto.mandatoryAddon().textContent());
    const total = parseAmount(await ditto.totalPremium().textContent());



    const sumofpremium = base + addon;

    


    expect(sumofpremium).toBeCloseTo(total, 2);
    //console.log('Sum of Base Premium and Mandatory Add-on:', sumofpremium);
    //await page.pause();

   
});