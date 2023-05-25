const { TimerOutlined } = require("@mui/icons-material");

describe('Schedule scroll check', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)
    cy.get('.mui-style-19afk2d .noUnderline').click();
    cy.wait(5000)
    cy.get('html').click();
    cy.wait(5000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-next:nth-child(3)').click();
    cy.wait(1000)
    cy.get('.swiper-button-prev:nth-child(2)').dblclick();
    cy.wait(1000)
    cy.get('.swiper-button-prev:nth-child(2)').click();
    cy.wait(1000)
    cy.get('.swiper-button-prev:nth-child(2)').click();
    cy.wait(1000)
    cy.get('.swiper-button-prev:nth-child(2)').dblclick();
    cy.wait(1000)
    cy.get('.swiper-button-prev:nth-child(2)').click();
    cy.wait(1000)
  

    cy.log('Test Complete');
   
})
})

// Test Working fine