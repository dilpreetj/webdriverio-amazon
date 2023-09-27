import { browser, expect, $ } from '@wdio/globals';

describe('Cart Flow', () => {
  let devicePrice;

  before(async () => {
    await browser.url('/');
    const searchInput = await $('#twotabsearchtextbox');
    const searchButton = await $('input[type="submit"]');
    await searchInput.addValue('macbook');
    await searchButton.click();
  });

  it('Add to Cart', async () => {
    await $('.s-product-image-container').click();
    devicePrice = await $('#corePrice_desktop span[aria-hidden="true"]')
      .getText();
    await $('#add-to-cart-button').click();
    await expect($('#NATC_SMART_WAGON_CONF_MSG_SUCCESS span'))
      .toHaveText('Added to Cart');

    const subtotal = await browser.execute(() => {
      return document.querySelector('#sw-subtotal span[class="a-offscreen"]').textContent
    })
    await expect(subtotal).toEqual(devicePrice);
  });

  it('Update Cart Qty', async () => {
    await $('#nav-cart').click();
    await $('#a-autoid-0-announce').click();
    await $('#quantity_2').click();
    const updatedSubtotal = await $('#sc-subtotal-amount-activecart span');
    await expect(updatedSubtotal).not.toHaveText(devicePrice);
  });
});