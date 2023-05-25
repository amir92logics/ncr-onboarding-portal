const { TimerOutlined } = require("@mui/icons-material")
  
  describe('Provide-Project-Csontacts', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')

    cy.wait(5000)

    cy.viewport(1920,1080)
    cy.wait(5000)
    
    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > :nth-child(1) > .actionPage > .mui-style-1ofqig9 > .Overview-container > .mui-style-1j70zlb > .mui-style-187vt5i > .mui-style-u3b3yb > #not-allowed > #action-pending-btn').click()  
    cy.get('.mui-style-17t26g5').click();
    cy.get('.container-layout > .actionPage .shadow:nth-child(4) #action-pending-btn').click();
    
    cy.wait(5000)
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(1) > .MuiBox-root:nth-child(1)').click();
    cy.wait(5000)

    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(1) > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click();

    cy.get('.MuiDialog-root > .MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg').click();


    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > :nth-child(2) > .mui-style-caad87 > .mui-style-59dhnn > .mui-style-x56ts5 > .MuiButtonBase-root > .MuiTypography-root > span').click()

    cy.wait(5000)

    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(2) > .MuiBox-root:nth-child(1) .MuiTypography-root:nth-child(1) > span:nth-child(1)').click();
    
    cy.get('.MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg > path').click();

    cy.wait(2000)
    
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(3) > .MuiBox-root:nth-child(1) .MuiTypography-root:nth-child(1) > span:nth-child(1)').click();

    cy.get('.MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg > path').click();
    cy.wait(2000)

    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(4) > .MuiBox-root:nth-child(1) .MuiTypography-root:nth-child(1) > span:nth-child(1)').click();

    cy.get('.MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg > path').click();
    cy.wait(2000)

    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(5) > .MuiBox-root:nth-child(1) .MuiTypography-root:nth-child(1) > span:nth-child(1)').click();

    cy.get('.MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg > path').click();
    cy.wait(2000)

    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(6) > .MuiBox-root:nth-child(1) .MuiTypography-root:nth-child(1) > span:nth-child(1)').click();

    cy.get('.MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg > path').click();
    cy.wait(2000)

    cy.get('svg:nth-child(1) > path:nth-child(1)').click();
    cy.wait(2000)

    // cy.get('.MuiDialog-container > .MuiPaper-root > .MuiBox-root > svg > path').click();
    
    


    // input not working
    // cy.get('.mui-style-1hil6o6 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('(+777) 777-7777')
    // cy.get('.mui-style-zb1lf1 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('erictest@gmail.com')
    // cy.get('.mui-style-1nn9vkd > .MuiBox-root > .MuiButton-contained').click()

    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > :nth-child(2) > .mui-style-111jor1 > .mui-style-59dhnn > .mui-style-x56ts5 > .MuiButtonBase-root > .MuiTypography-root > span').click()
    
    // cy.get('#NCR-SELECT').click()
    // cy.get('.MuiButtonBase-root > .mui-style-0 > .MuiTypography-root').click()
    // cy.get('.mui-style-11zuhyn > .MuiBox-root > .MuiButton-contained').click()
    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > :nth-child(2) > .mui-style-loouck > .mui-style-59dhnn > .mui-style-x56ts5 > .MuiButtonBase-root > .MuiTypography-root > span').click()
    // cy.get('#NCR-SELECT').click()
    // cy.get('.MuiButtonBase-root > .mui-style-0 > .MuiTypography-root').click()
    // cy.get('.mui-style-11zuhyn > .MuiBox-root > .MuiButton-contained').click()

    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > :nth-child(2) > .mui-style-8ps2f7 > .MuiBox-root > .MuiButton-contained').click()
    cy.log('test complete')
    

  })
})

// Test working fine