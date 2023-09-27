import { browser, expect, $ } from '@wdio/globals';

describe('Amazon Home Page', () => {
  it('Access url, verify url and title', async () => {
    await browser.url('/');
    await expect(browser).toHaveUrlContaining('amazon');
    await expect(browser).toHaveTitleContaining('Amazon.com');
  });

  it('Search Content and Verify Text', async () => {
    const searchInput = await $('#twotabsearchtextbox');
    const searchButton = await $('input[type="submit"]');
    const expectedSearchText = await $('.a-color-state.a-text-bold');

    await searchInput.addValue('macbook');
    await searchButton.click();
    await expect(expectedSearchText).toHaveTextContaining('macbook');
  });

  it.only('Auto Suggestion', async () => {
    await browser.url('/');
    const searchInput = await $('#twotabsearchtextbox');
    const suggestionPane = await $('.left-pane-results-container');
    const firstSearchResult = await suggestionPane.$('div');
    const expectedSearchText = await $('.a-color-state.a-text-bold');

    await searchInput.click();
    await expect(suggestionPane).toBeDisplayed();
    await browser.keys('ArrowDown');
    const expectedText = await firstSearchResult.getText();
    await browser.keys('Enter');
    await expect(expectedSearchText).toHaveTextContaining(expectedText);
  });
});