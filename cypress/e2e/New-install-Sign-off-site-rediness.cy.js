const { TimerOutlined } = require("@mui/icons-material");

describe('New install Sign off site rediness', () => {
  it('NCR', () => {
    cy.visit('http://localhost:3000/actions/17579')
    cy.wait(2000)
    cy.viewport(1920,1080)
    cy.wait(5000)
    cy.get('.container-layout > .actionPage .shadow:nth-child(9) #action-pending-btn').click({ force: true });
    cy.wait(2000)

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .site-rediness > form > .mui-style-1voambi > .mui-style-1erka5u > .mui-style-11mn6qt > .mui-style-walg0d > .mui-style-12fv54p > .MuiTable-root > .MuiTableBody-root > .mui-style-67z2rd-MuiTableRow-root').click({ force: true });
    cy.get('.mui-style-j49a8w-MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });
    
    cy.get('[aria-label="There is a duplex (2 plugs) at each terminal or kitchen station."] > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });


    cy.get('.mui-style-i75r6q-MuiFormControlLabel-root > .Mui-checked > .PrivateSwitchBase-input').click({ force: true });
    cy.get('.MuiFormControlLabel-root:nth-child(3) .PrivateSwitchBase-input').click({ force: true });
    cy.get('.mui-style-1caj4pt-MuiFormControlLabel-root .PrivateSwitchBase-input').click({ force: true });
    cy.get('.mui-style-is663a-MuiFormControlLabel-root .PrivateSwitchBase-input').click({ force: true });
    cy.get('.MuiBox-root:nth-child(3) .shadow:nth-child(3) .MuiTableRow-root:nth-child(1)').click({ force: true });
    cy.get(':nth-child(3) > .MuiTable-root > .MuiTableBody-root > .mui-style-1qjqueb-MuiTableRow-root > .MuiTableCell-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .mui-style-0 > .mui-style-fjuvcz > .mui-style-j49a8w-MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });
    cy.get(':nth-child(3) > .MuiTable-root > .MuiTableBody-root > .mui-style-1qjqueb-MuiTableRow-root > .MuiTableCell-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .mui-style-0 > .mui-style-fjuvcz > .mui-style-i75r6q-MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });
    cy.get(':nth-child(3) > .MuiTable-root > .MuiTableBody-root > .mui-style-1qjqueb-MuiTableRow-root > .MuiTableCell-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .mui-style-0 > .mui-style-fjuvcz > .mui-style-1caj4pt-MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });
    cy.get(':nth-child(3) > .MuiTable-root > .MuiTableBody-root > .mui-style-1qjqueb-MuiTableRow-root > .MuiTableCell-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .mui-style-0 > .mui-style-fjuvcz > .mui-style-is663a-MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });


    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .site-rediness > form > .mui-style-1voambi > .mui-style-1erka5u > .mui-style-11mn6qt > .mui-style-walg0d > :nth-child(4) > .MuiTable-root > .MuiTableBody-root > .mui-style-67z2rd-MuiTableRow-root').click({ force: true });
    cy.get(':nth-child(4) > .MuiTable-root > .MuiTableBody-root > .mui-style-1qjqueb-MuiTableRow-root > .MuiTableCell-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .mui-style-0 > .MuiBox-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });


    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .site-rediness > form > .mui-style-1voambi > .mui-style-1erka5u > .mui-style-11mn6qt > .mui-style-walg0d > :nth-child(5) > .MuiTable-root > .MuiTableBody-root > .mui-style-67z2rd-MuiTableRow-root').click({ force: true });
    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .site-rediness > form > .mui-style-1voambi > .mui-style-1erka5u > .mui-style-11mn6qt > .mui-style-walg0d > :nth-child(5) > .MuiTable-root > .MuiTableBody-root > .mui-style-67z2rd-MuiTableRow-root > .mui-style-1l6h2fw-MuiTableCell-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });

    cy.get('.mui-style-rqz571 > .mui-style-bufxhs > .container-layout > .site-rediness > form > .mui-style-1voambi > .mui-style-1erka5u > .mui-style-11mn6qt > .site-readiness > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ force: true });

    cy.log('Test Complete');

    // Test Working fine
})
})