const { TimerOutlined } = require("@mui/icons-material");

describe('Navbar', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000');
    cy.wait(2000)
    cy.viewport(1920,1080)
    cy.wait(5000)

  
    
    cy.get('.mui-style-1s315wo').click();
    cy.wait(2000)
    cy.get('.mui-style-1r0ghhg > svg').click();
    cy.wait(2000)
    cy.get('svg:nth-child(2) > path').click();
    cy.wait(2000)
    cy.get('.mui-style-e9b0v4-MuiTypography-root').click();
    cy.wait(2000)
    

    // cy.get('.mui-style-1isf8jm-MuiPaper-root .routeText').click();
    // cy.wait(2000)
    // cy.get('.mui-style-1yvbazv').click();
    // cy.wait(2000)
    // cy.get('.mui-style-1r0ghhg > svg').click();
    // cy.wait(2000)
    // cy.get('.rotate-45 > path').click();
    // cy.wait(2000)
    // cy.get('.mui-style-1isf8jm-MuiPaper-root .routeText').click();
    // cy.wait(2000)
    // cy.get('svg:nth-child(2)').click();
    // cy.wait(2000)
    
    cy.log('Test Complete');
   
})
})

// Working fine