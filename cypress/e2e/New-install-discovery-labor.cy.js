const { TimerOutlined } = require("@mui/icons-material")

describe('New-install-Discovery-labor', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/discovery/17579')

    cy.wait(3000)

    cy.wait(5000)

    cy.viewport(1920,1080)
    cy.wait(5000)

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-1xkjs3k > :nth-child(2) > .mui-style-t6ot1t > :nth-child(2) > .mui-style-1ycstfc > .MuiButtonBase-root').click();

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-1pwvic3 > form > :nth-child(1) > .mui-style-rfyu1d > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #ncr-select-Sunday').click({ force: true });

    cy.get('.MuiList-root > [tabindex="0"]').click({ force: true });

    cy.wait(5000)

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-1pwvic3 > form > :nth-child(2) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #id-minimum-wage').type('12');

    cy.wait(2000)

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-1pwvic3 > form > :nth-child(3) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #id-minimum-tipped').type('15');

    cy.wait(2000)

    // cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-1pwvic3 > form > :nth-child(4) > .mui-style-rfyu1d > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #ncr-select-Employees\ receive\ their\ credit\ card\ tips\ in\ cash\ after\ their\ shift').click({ force: true });

    // cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-1pwvic3 > form > :nth-child(4) > .mui-style-rfyu1d > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > #ncr-select-Employees').click({ force: true });

    cy.get('.body > #menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root:nth-child(2)').click({ force: true });
    

    cy.log('test complete')
})
})

// Test Working fine