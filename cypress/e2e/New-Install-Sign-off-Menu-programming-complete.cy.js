const { TimerOutlined } = require("@mui/icons-material")
  
  describe('New-Install-Sign-off-Menu-programming-complete', () => {
  it('NCR', async() => {
   await cy.visit('http://localhost:3000/actions/17579')

    cy.wait(5000)

    cy.viewport(1920,1080)
    cy.wait(5000)
    
    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > :nth-child(1) > .actionPage > .mui-style-1ofqig9 > .Overview-container > .mui-style-1j70zlb > .mui-style-187vt5i > .mui-style-u3b3yb > #not-allowed > #action-pending-btn').click()  
    cy.get('.mui-style-17t26g5').click();
    cy.get('.container-layout > .actionPage .shadow:nth-child(8) #action-pending-btn').click();
    cy.wait(5000)
    // cy.get('.container-layout > .actionPage .shadow:nth-child(4) #action-pending-btn').click();

    cy.get('.MuiBox-root:nth-child(3) .shadow .MuiButtonBase-root').click();
    cy.get('.MuiInputBase-input').click();
    cy.get('.MuiInputBase-input').type('sherry');
    cy.get('.swiper-wrapper > .swiper-slide:nth-child(1) > .MuiBox-root > .MuiBox-root > .f-f-i').click();
    cy.get('.MuiButton-contained').click();
    cy.get('form').submit();

})
})

// Test working fine