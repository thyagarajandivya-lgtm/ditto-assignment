import { Page, expect } from '@playwright/test';

export class DittoFqPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://app.joinditto.in/fq');
  }
  async selectPlan() {
    await this.page.getByText('Care Supreme').click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

    async fillMemberDetails(age: string, pin: string) {
    await this.page.getByText('Self', { exact: true }).click();
    await this.page.locator('div:has(> span:text("Self"))').getByText('Female').first().click();
    await this.page.getByText('Next step', { exact: true }).click();
    await this.page.getByPlaceholder('Your age').fill(age);
    await this.page.getByPlaceholder('Enter your pin code').fill(pin);
  }

  async calculatePremium() {
    await this.page.getByRole('button', { name: 'Calculate Premium' }).click();
  }

  basePremium() {
    return this.page.getByText('Base Premium', { exact: true }).locator('..');
  }

  totalPremium() {
    return this.page.getByText('Total Premium', { exact: true }).locator('..');
  }

  mandatoryAddon() {
    return this.page.locator(
      '//span[text()="Mandatory Add-ons"]/following::span[contains(text(),"₹")][1]'
    );
  }
}