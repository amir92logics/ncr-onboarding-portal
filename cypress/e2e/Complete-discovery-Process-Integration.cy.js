const { TimerOutlined } = require("@mui/icons-material");

describe('Complete discovery Process, Integration', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)


    cy.get('.container-layout > .actionPage .shadow:nth-child(7) #action-pending-btn').click();
    cy.wait(5000) 

    // cy.get('.container-layout > .actionPage .shadow:nth-child(6) #action-pending-btn').click();

    // cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(3) .MuiButtonBase-root').click();
    cy.wait(5000) 

    cy.get('.MuiBox-root:nth-child(3) > .MuiBox-root > .container-layout > .MuiBox-root > .MuiGrid-root:nth-child(3) > .MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click();
    // cy.get ('.MuiBox-root:nth-child(3) > .MuiBox-root > .container-layout > .MuiBox-root > .MuiGrid-root:nth-child(2) > .MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click();

    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(1) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(2) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(4) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(3) .MuiFormControlLabel-root:nth-child(1) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(5) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(6) .MuiFormControlLabel-root:nth-child(1) > .MuiTypography-root:nth-child(2)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(6) .MuiFormControlLabel-root:nth-child(1) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(8) .MuiFormControlLabel-root:nth-child(1) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.mui-style-80mh2o > svg').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(7) .MuiFormControlLabel-root:nth-child(1) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .container-layout > .MuiBox-root > .MuiBox-root:nth-child(4) > .MuiBox-root').click();
    // cy.get('.MuiBox-root:nth-child(3) .container-layout > .MuiBox-root > .MuiBox-root:nth-child(4) > .MuiBox-root').click();

    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(8) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root > .MuiButtonBase-root').click();

    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(4) > .MuiGrid-root:nth-child(1) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(4) > .MuiGrid-root:nth-child(2) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(4) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(4) > .MuiGrid-root:nth-child(3) .MuiFormControlLabel-root:nth-child(2) > .MuiTypography-root:nth-child(2)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(4) > .MuiGrid-root:nth-child(3) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(5) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(7) > .MuiGrid-root:nth-child(1) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(7) > .MuiGrid-root:nth-child(2) .MuiFormControlLabel-root:nth-child(2) > .MuiTypography-root:nth-child(2)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(7) > .MuiGrid-root:nth-child(2) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(7) > .MuiGrid-root:nth-child(3) .MuiFormControlLabel-root:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
 
    cy.log('Test Complete')

// Test working fine
})
})