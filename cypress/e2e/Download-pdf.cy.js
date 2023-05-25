const { TimerOutlined } = require("@mui/icons-material");

describe('Download pdf Documents', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)

    cy.get('.mui-style-xdq54q').click();
    cy.wait(5000)
    cy.log('Menu nav clicked')

    cy.wait(5000)
    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','mydownloads','example.jpg')
    
    cy.log('Test Complete')
})
})

//Test Working fine