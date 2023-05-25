

const { TimerOutlined } = require("@mui/icons-material")

describe('New-install-Confirm-site-information', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17579')


    cy.wait(5000)

    cy.viewport(1920,1080)
    cy.wait(5000)

    cy.get('.container-layout > .actionPage .shadow:nth-child(3) #action-pending-btn').click(); 
    // cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > .intallation > .mui-style-177tn02 > .mui-style-3yf2zp > .mui-style-fc5t39 > .mui-style-w6pf5h > .MuiButtonBase-root').click()
    // // cy.get('.react-calendar__month-view__days > :nth-child(25)').click()
    // // cy.get('.mui-style-10uhp02 > .MuiButton-contained').click()
    // // cy.wait(500)

    // cy.get('.mui-style-10uhp02 > .MuiButton-contained').click()
    ///cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > .intallation > .mui-style-177tn02 > .mui-style-3yf2zp > :nth-child(2) > .mui-style-v0klsg > #site-readniess-achknowledgment > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check()
    ///cy.get('.mui-style-r2iicv > .mui-style-bufxhs > .container-layout > .intallation > .mui-style-177tn02 > .mui-style-3yf2zp > :nth-child(2) > .mui-style-v0klsg > #site-readniess-achknowledgment > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
    ///cy.get('.MuiInputBase-input').type('test')
    ///cy.get('.swiper-slide-active > .mui-style-1pdu7md > .mui-style-axch3k > .f-f-i').click()
    ///cy.get('.upload-popup-btns > .MuiButton-contained').click()
    
     

    
   
    cy.log('test complete')
})
})

// Test Working fine