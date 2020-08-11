/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
	it('cadastro de usuário no site', () => {

		//rotas
		// POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
		// POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
		// GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
		cy.server();
		cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
			.as('postNewTable');

		cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
			.as('postUserTable');

		cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
			.as('getNewTable');

		cy.visit('Register.html');

		// type - serve para digitar um texto em um campo
		cy.get('input[placeholder="First Name"]').type(chance.first());
		cy.get('input[ng-model^=Last]').type(chance.last());
		cy.get('input[ng-model^="EmailAdress"]').type(chance.email());
		cy.get('input[ng-model^="Phone"]').type(chance.phone({formatted: false}));

		//check Usado para interagir com checkboxes e radios
		cy.get('input[value="FeMale"]').check();
		cy.get('input[type="checkbox"]').check('Cricket');
		cy.get('input[type="checkbox"]').check('Hockey');

		//select Select e select 2 ou combos
		cy.get('select#Skills').select('Javascript');
		cy.get('select#countries').select('Brazil');
		cy.get('select#country').select('South Africa', {force: true});
		cy.get('select#yearbox').select('1996');
		cy.get('select[ng-model="monthbox"]').select('May');
		cy.get('select#daybox').select('6');

		//Preenchendo a senha
		cy.get('input#firstpassword').type('Abc@123');
		cy.get('input#secondpassword').type('Abc@123');

		// Anexando imagem- Fazendo Upload
		cy.get('input#imagesrc').attachFile('homer.jpg');

		//Clicando no Botão Submit
		cy.get('button#submitbtn').click();

		//Rota é uma forma de mapear o uso de mocks
		cy.wait('@postNewTable').then((resNewTable) => {
			//chai
			expect(resNewTable.status).to.eq(200);
		})

		cy.wait('@postUserTable').then((resUserTable) => {
			//chai
			expect(resUserTable.status).to.eq(200);
		})

		cy.wait('@getNewTable').then((resGetNewTable) => {
			//chai
			expect(resGetNewTable.status).to.eq(200);
		})

		cy.url().should('contain', 'WebTable');

	});

});
