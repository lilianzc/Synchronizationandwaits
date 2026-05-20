// @ts-check
const { test, expect } = require('@playwright/test');

test('automate checkbox', async ({ page }) => {
await page.goto('https://the-internet.herokuapp.com/');
await page.getByText('Checkboxes').click();
await expect(page.getByRole('heading', {name: 'Checkboxes' })).toBeVisible();
await expect(page.locator('input[type="checkbox"]').nth(1)).toBeChecked();
//check first checkbox and validate it is checked
await page.locator('input[type="checkbox"]').first().check();
await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
//uncheck second checkbox and validate it is unchecked
await page.locator('input[type="checkbox"]').first().uncheck();
await expect(page.locator('input[type="checkbox"]').nth(1)).not.toBeChecked
});

test('automate dropdown', async ({ page }) => {
await page.goto('https://the-internet.herokuapp.com/');
await page.getByText('Dropdown').click();
await expect(page.getByRole('heading', {name: 'Dropdown' })).toBeVisible();
await page.getByRole('combobox').click();
await page.locator('#dropdown').selectOption('2');
await expect(page.locator('#dropdown')).toHaveValue('2');
});

test('automate js alert', async ({ page }) => {
await page.goto('https://the-internet.herokuapp.com/'); 
await page.getByText('JavaScript Alerts').click();
await expect(page.getByRole('heading', {name: 'JavaScript Alerts' })).toBeVisible();
await page.getByRole('button', {name: 'Click for JS Alert'}).click();
//listen for alert
page.on('dialog', async myAlert => {
    console.log(myAlert.message());
    expect(myAlert.message()).toBe('I am a JS Alert');
    await myAlert.accept();
})
});

test('find by getByRole/css/xpath', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    //find by getBy Role
    await page.getByRole('link', { name: 'Checkboxes' }).click();
    await expect(page.getByRole('heading', {name: 'Checkboxes' })).toBeVisible();
    await page.goBack();
    //find by CSS selector
    await page.locator('a[href = "/checkboxes"]').click();
    await expect(page.getByRole('heading', {name: 'Checkboxes' })).toBeVisible();
    await page.goBack();
    //find by xpath
    await page.locator('//a[@href="/checkboxes"]').click();
    await expect(page.getByRole('heading', {name: 'Checkboxes' })).toBeVisible();

});


test('extract table', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', {name: "Sortable Data Tables"}).click();
    await expect(page.getByRole('heading' , {name: "Data Tables"})).toBeVisible();
    const table1 = page.locator('table[id="table1"]');
    const rowHeader = table1.getByRole('columnheader');
    await rowHeader.count();
    await expect(rowHeader).toHaveCount(6);
    

});

test('sleep', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading');
    await expect(page.getByRole('heading' , {name: "Dynamically Loaded Page Elements"})).toBeVisible();
    await page.getByRole('link' , {name: 'Example 1: Element on page that is hidden'}).click();
    await expect(page.getByRole('heading' , {name: "Dynamically Loaded Page Elements"})).toBeVisible();
    await expect(page.getByRole('heading' , {name: "Example 1: Element on page that is hidden"})).toBeVisible();
    await page.getByRole('button' , {name: 'Start'}).click();
    //implicit wait
    await page.waitForTimeout(3000);
    await expect(page.getByRole('heading' , {name: "Hello World!"})).toBeVisible();
