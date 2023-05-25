const { TimerOutlined } = require("@mui/icons-material")

describe('Confirm-site-information', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')

    cy.wait(3000)

    cy.get('.mui-style-r2iicv > .mui-style-bufxhs > :nth-child(1) > .actionPage > .mui-style-1ofqig9 > .Overview-container > .mui-style-1j70zlb > .mui-style-187vt5i > .mui-style-u3b3yb > #not-allowed > #action-pending-btn').click() 
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

    // Test Working fine


    

    


    

     
    
     
   

    



  })
})