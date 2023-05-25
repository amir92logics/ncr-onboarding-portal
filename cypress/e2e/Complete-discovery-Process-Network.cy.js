const { TimerOutlined } = require("@mui/icons-material");

describe('Complete discovery Process, Network', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17581')
    cy.wait(2000)

    cy.viewport(1920,1080)
    cy.wait(5000)


    cy.get('.container-layout > .actionPage .shadow:nth-child(7) #action-pending-btn').click();
    // cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(1) .MuiButtonBase-root').click();
    // cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(2) > .MuiBox-root > .MuiBox-root > .MuiBox-root:nth-child(2)').click();
    cy.get('.MuiBox-root:nth-child(3) > .MuiBox-root > .container-layout > .MuiBox-root > .MuiGrid-root:nth-child(2) > .MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click();
    // cy.get('.container-layout > .actionPage .shadow:nth-child(6) #action-pending-btn').click();
    
    // cy.get('.MuiBox-root:nth-child(3) .MuiGrid-root:nth-child(2) .MuiButtonBase-root').click();

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .mui-style-0 > .mui-style-1eplw9n > .MuiBox-root > .MuiButtonBase-root').click();
    
    cy.wait(5000)

    // cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .network-set1 > form > .MuiFormGroup-root > .mui-style-or4kt > .mui-style-9e6fz9-MuiTypography-root').click({ force: true });
    // cy.wait(5000)

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .network-set1 > form > .MuiFormGroup-root > .mui-style-12mdqcb > .mui-style-igzgas').click();
    cy.wait(5000)

    cy.get('.MuiBox-root:nth-child(3) .network-requirements > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(5000)
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(2) .PrivateSwitchBase-input:nth-child(1)').click();
    cy.wait(5000)
    cy.get('.MuiBox-root:nth-child(3) .container-layout .MuiButtonBase-root:nth-child(2)').click();
    cy.wait(5000)
    cy.get('.MuiBox-root:nth-child(3) form').submit();

    cy.wait(5000)
    cy.get('.mui-style-8atqhb > .MuiBox-root:nth-child(4)').click();
    cy.wait(5000)
    cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(3) path').click();
    cy.wait(5000)
    cy.get('.MuiButton-text').click();
    cy.wait(5000)
    cy.get('.MuiBox-root:nth-child(3) .MuiButtonBase-root:nth-child(2)').click();
    cy.wait(5000)

    cy.log('Test Complete')

    // Test Working fine

    // Input type 

    // cy.get('.mui-style-17t26g5').click();
    // cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(3) svg').click();
    // cy.get('.mui-style-1c3of7i > svg').click();
    // cy.get('.MuiBox-root:nth-child(3) .MuiButtonBase-root:nth-child(2)').click();
    
    // cy.get('.MuiBox-root:nth-child(3) .MuiInputBase-input').type('keyboard');
    // cy.wait(2000)
    // cy.get('.Mui-focused > #id-address').click();
    // cy.get('.MuiBox-root:nth-child(4) #id-address').type('19.168.18.12');
    // cy.get('.Mui-focused > #id-address').click();
    // cy.get('.MuiBox-root:nth-child(5) #id-address').type('192.168.18.3');
    // cy.get('.Mui-focused > .MuiInputBase-input').click();
    // cy.get('.MuiBox-root:nth-child(6) .MuiInputBase-input').type('4');
    // cy.get('.mui-style-lurvf1-MuiButtonBase-root-MuiButton-root').click();
    // cy.wait(5000)
    // cy.get('form').submit();
    // cy.wait(5000)
    // cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(7) svg').click();
    // cy.get('.Mui-focused > .MuiInputBase-input').click();
    // cy.get('.MuiBox-root:nth-child(3) .MuiInputBase-input').type('facebook');
    // cy.get('.Mui-focused > .MuiInputBase-input').click();
    // cy.get('.MuiBox-root:nth-child(4) .MuiInputBase-input').type('facebook.com');
    // cy.get('.mui-style-lurvf1-MuiButtonBase-root-MuiButton-root').click();
    // cy.get('form').submit();
    // cy.get('.MuiBox-root:nth-child(3) .MuiBox-root:nth-child(10) svg').click();
    // cy.get('.Mui-focused > #id-address').click();
    // cy.get('.mui-style-1r2ed6n #id-address').type('192.168.18.21');
    // cy.get('.Mui-focused > #id-address').click();
    // cy.get('.MuiBox-root:nth-child(4) #id-address').type('192.168.14.21');
    // cy.get('.Mui-focused > #id-address').click();
    // cy.get('.Mui-error > #id-address').type('{backspace}');
    // cy.get('.Mui-error > #id-address').type('{backspace}');
    // cy.get('.Mui-error > #id-address').type('{backspace}');
    // cy.get('.MuiBox-root:nth-child(5) #id-address').type('192.168.57.23');
    // cy.get('.Mui-focused > #id-address').click();
    // cy.get('.Mui-error > #id-address').type('{backspace}');
    // cy.get('.MuiBox-root:nth-child(6) #id-address').type('192.168.223.35');
    // cy.get('.mui-style-lurvf1-MuiButtonBase-root-MuiButton-root').click();
    // cy.get('form').submit();
    // cy.get('.MuiBox-root:nth-child(3) .MuiButtonBase-root:nth-child(2)').click();


})
})

// Not fixed