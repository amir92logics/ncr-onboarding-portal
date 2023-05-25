const { TimerOutlined } = require("@mui/icons-material");

describe('Upload Documents', () => {
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
    
// // File upload issue
//     const filepath = 'dummy.pdf';
//     cy.get('.MuiBox-root:nth-child(3) .d-absolute:nth-child(2)').attachFile(filepath);   
//     cy.get('.MuiBox-root:nth-child(3) .d-absolute:nth-child(2)').contains ("dummy.pdf");    
//     cy.get('.MuiBox-root:nth-child(3) .d-absolute:nth-child(2)').click();
//     cy.wait(5000)
//     cy.get('.d-absolute:nth-child(2)').type('');
//     cy.wait(5000)
//     cy.get('.mui-style-y2aogz-MuiButtonBase-root-MuiButton-root').click();
//     cy.wait(5000)
//     cy.get('.MuiBox-root:nth-child(3) .d-absolute:nth-child(2)').click();
//     cy.wait(5000)
//     cy.get('.d-absolute:nth-child(2)').type('');
//     cy.wait(5000)
//     cy.get('.mui-style-y2aogz-MuiButtonBase-root-MuiButton-root').click();
//     cy.wait(5000)
//     cy.get('.MuiBox-root:nth-child(3) .d-absolute:nth-child(2)').click();
//     cy.wait(5000)
//     cy.get('.d-absolute:nth-child(2)').type('');
//     cy.wait(5000)
//     cy.get('.mui-style-y2aogz-MuiButtonBase-root-MuiButton-root').click();
//     cy.wait(5000)
//     cy.get('.MuiBox-root:nth-child(3) .d-absolute:nth-child(2)').click();
//     cy.wait(5000)
//     cy.get('.d-absolute:nth-child(2)').type('');
//     cy.wait(5000)
//     cy.get('.MuiButton-outlined').click();

    cy.log('Test Complete')

})
})