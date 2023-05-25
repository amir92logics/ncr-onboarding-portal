const { TimerOutlined } = require("@mui/icons-material");

describe('Discovery Network tab switches', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)
    cy.viewport(1920,1080)
    cy.wait(5000)

    
    cy.get('.mui-style-mr0aht').click();
    cy.wait(2000)
    cy.get('.MuiList-root:nth-child(6) > .MuiCollapse-root:nth-child(3) .MuiListItem-root > .MuiBox-root > .MuiBox-root').click();
    cy.wait(2000)
    cy.get('.MuiCollapse-root:nth-child(2) .noUnderline').click();
    cy.wait(2000)
    cy.get('.MuiCollapse-root:nth-child(4) .MuiBox-root > .MuiBox-root > .MuiBox-root').click();
    cy.wait(2000)
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(4) .MuiButtonBase-root:nth-child(1)').click();
    cy.wait(2000)
    cy.get('.MuiBox-root:nth-child(3) > .MuiBox-root .MuiBox-root > .MuiButtonBase-root:nth-child(1)').click();
    cy.wait(2000)
    



    cy.log('Test Complete');

  //Test Working fine
   
})
})