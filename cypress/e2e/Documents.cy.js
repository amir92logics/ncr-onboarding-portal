const { TimerOutlined } = require("@mui/icons-material");


describe('Documents', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)

    cy.get('.mui-style-xdq54q').click();
    cy.wait(5000)
    cy.log('Menu nav clicked')
  
    cy.get('.MuiCollapse-root:nth-child(2) .noUnderline > .MuiBox-root').click();
    cy.wait(5000)
    cy.log('next button clicked')

    cy.get('.mui-style-y2aogz-MuiButtonBase-root-MuiButton-root').click();
    cy.wait(5000)
    cy.log('next button clicked')
  
    cy.get('.mui-style-y2aogz-MuiButtonBase-root-MuiButton-root').click();
    cy.wait(5000)
    cy.log('next button clicked')

    cy.get('.mui-style-y2aogz-MuiButtonBase-root-MuiButton-root').click();
    cy.wait(5000)
    cy.log('back button clicked')

    cy.get('.MuiButton-outlined').click();
    cy.wait(5000)
    cy.log('back button clicked')

    cy.get('.MuiButton-outlined').click();
    cy.wait(5000)
    cy.log('back button clicked')

    cy.get('.MuiButton-outlined').click();

    cy.wait(5000)

    cy.log('Test Complete')

    //Test Working fine

})
})