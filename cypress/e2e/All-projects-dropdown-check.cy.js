const { TimerOutlined } = require("@mui/icons-material");

describe('All Projects Dropdown check', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000');
    cy.wait(2000)
    cy.viewport(1920,1080)
    cy.wait(5000)

cy.get('.mui-style-1s315wo').click();
cy.get('.MuiTableRow-root:nth-child(1) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root').click();
cy.get('.MuiTableRow-root:nth-child(3) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root').click();
cy.get('.MuiTableRow-root:nth-child(5) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root').click();
cy.get('.MuiTableRow-root:nth-child(7) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root > svg').click();
cy.get('.MuiTableRow-root:nth-child(9) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root').click();
cy.get('.MuiTableRow-root:nth-child(11) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root > svg').click();
cy.get('.MuiTableRow-root:nth-child(13) > .MuiTableCell-root > .MuiBox-root > .MuiButtonBase-root').click();

cy.wait(5000)

cy.log('Test Complete');
   
})
})

// Working fine