const { TimerOutlined } = require("@mui/icons-material");

describe('Complete discovery Process, Back office Computer and Printer', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)

    cy.get('.container-layout > .actionPage .shadow:nth-child(7) #action-pending-btn').click();

    // cy.get('.container-layout > .actionPage .shadow:nth-child(6) #action-pending-btn').click();
    cy.wait(5000)
// cy.get('.container-layout > .actionPage .shadow:nth-child(7) #action-pending-btn').click();
// cy.wait(5000)
  // cy.get('.MuiBox-root:nth-child(3) > .MuiBox-root > .container-layout > .MuiBox-root > .MuiGrid-root:nth-child(3) > .MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click();
  cy.get('.MuiBox-root:nth-child(3) > .MuiBox-root > .container-layout > .MuiBox-root > .MuiGrid-root:nth-child(1) > .MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click({ force: true });
  
  cy.wait(5000)

  // cy.get('.container-layout > .boc-com > .mui-style-1kd18sm > .mui-style-jjysg > .mui-style-1gmj8f0 > .mui-style-wxuobb > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #ncr-select-Sitting').click({ force: true });
  
  // cy.get('.MuiSelect-select MuiSelect-standard MuiInputBase-input MuiInput-input mui-style-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input').click({ force: true });
  // cy.wait(5000)

    // cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(1) .MuiButtonBase-root').click();
   
    // cy.get('.MuiSelect-select MuiSelect-standard MuiInputBase-input MuiInput-input mui-style-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input').select('sitting-on-the-desk').should('have.value','sitting-on-the-desk');
    // // cy.get('#ncr-select-Sitting on my desk').click();
    
    cy.get('.container-layout > .boc-com > .mui-style-1kd18sm > .mui-style-1evh981 > .mui-style-1jf8wkl > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('Del');
  

    // cy.get('body').click();
    // cy.get('.Mui-selected').click();
    cy.get('.container-layout:nth-child(1) > .boc-com:nth-child(1) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.container-layout > .boc-com .shadow:nth-child(2) > .MuiBox-root:nth-child(3)').click();
    

    cy.log('Test Complete');
    
    // cy.get('.body').click();
    // cy.get('.body > #menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(1)').click();
    // cy.wait(5000)
    
    
    
    // await page.waitForSelector('body > #menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(2)')
    // await page.click('body > #menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(2)')
    
    // await page.waitForSelector('.container-layout > .boc-com > .MuiBox-root > .shadow > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
    // await page.click('.container-layout > .boc-com > .MuiBox-root > .shadow > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
    
    // await page.waitForSelector('body')
    // await page.click('body')
    
    // await page.waitForSelector('body > #menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(3)')
    // await page.click('body > #menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(3)')
    
    // await page.waitForSelector('.container-layout > .boc-com > .MuiBox-root > .shadow > .MuiBox-root > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
    // await page.click('.container-layout > .boc-com > .MuiBox-root > .shadow > .MuiBox-root > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')


    // cy.get('.Mui-focused > .MuiInputBase-input').type('{backspace}');
    // cy.get('.container-layout > .boc-com .shadow > .MuiBox-root > .MuiFormControl-root .MuiInputBase-input').type('no idea');
    // cy.get('body').click();
    // cy.get('.Mui-selected').click();
  
})
})

// Test working fine