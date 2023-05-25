const { TimerOutlined } = require("@mui/icons-material");

describe('Sign off site rediness', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)
    cy.viewport(1920,1080)
    cy.wait(5000)
    cy.get('.container-layout > .actionPage .shadow:nth-child(8) #action-pending-btn').click();
    cy.wait(2000)


    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.wait(2000)
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(3) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.wait(2000)
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(4) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.wait(2000)
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(5) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.wait(2000)
    cy.get('.MuiBox-root:nth-child(3) .site-readiness:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();

    // cy.get('.container-layout > .actionPage .shadow:nth-child(3) #action-pending-btn').click();
    // cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    // cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(3) .PrivateSwitchBase-input:nth-child(1)').click();
    // cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(4) .PrivateSwitchBase-input:nth-child(1)').click();
    // cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(5) .PrivateSwitchBase-input:nth-child(1)').click();
    // cy.get('#collapse-table0\.00149580893560608 > .MuiButtonBase-root').click();
    // cy.get('#collapse-table0\.9678077382216033 > .MuiButtonBase-root').click();
    // cy.get('.MuiBox-root:nth-child(3) .site-readiness:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    
    cy.log('Test Complete');

    // Test Working fine
})
})