const { TimerOutlined } = require("@mui/icons-material");

describe('New-install-confirm-signature', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17579')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)

    cy.get('.container-layout > .actionPage .shadow:nth-child(5) #action-pending-btn').click();
    
    cy.wait(2000);

    cy.get('.MuiBox-root:nth-child(3) > .MuiBox-root:nth-child(1) .PrivateSwitchBase-input:nth-child(1)').click();

    cy.get('.mui-style-1cyz5y7-MuiButtonBase-root-MuiButton-root').click();
    cy.get('.MuiInputBase-input').click();
    cy.get('.MuiInputBase-input').type('sherry');
    cy.wait(2000);
    cy.get('.swiper-wrapper > .swiper-slide:nth-child(1) > .MuiBox-root > .MuiBox-root > .f-f-i').click();
    cy.wait(2000);
    cy.get('.MuiButton-containedSizeMedium').click();
    cy.wait(2000);


    // cy.get('.PrivateSwitchBase-input mui-style-1m9pwf3').trigger('mouseover').click();
    // cy.get('.mui-style-1cyz5y7-MuiButtonBase-root-MuiButton-root').click();
    // cy.get('.mui-style-11mn6qt').click();
    // cy.get('.MuiInputBase-input').click();
    // cy.get('.MuiInputBase-input').type('sherry');
    // cy.get('.mui-style-1kzalkt').click();
    // cy.get('.MuiButton-containedSizeMedium').click();
    // cy.get('form').submit();
    // cy.get('.MuiBox-root:nth-child(2) > .MuiPaper-root .MuiTypography-root').click();

    cy.log('Test Complete');

})
})

// Test Working fine