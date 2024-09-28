describe('Teste de Login com Credenciais Corretas', () => {

  it('Deve realizar login com sucesso', () => {
    cy.visit('https://the-internet.herokuapp.com/login')

    cy.get('#username').type('tomsmith')

    cy.get('#password').type('SuperSecretPassword!')

    cy.get('button[type="submit"]').click()

    cy.get('.flash.success').should('contain.text', 'You logged into a secure area!')
  })

})

describe('Teste de Login com Credenciais Incorretas', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login')
  })

  it('Deve exibir erro para nome de usuário incorreto', () => {
    cy.get('#username').type('Bruno')

    cy.get('#password').type('SuperSecretPassword!')

    cy.get('button[type="submit"]').click()

    cy.get('.flash.error').should('contain.text', 'Your username is invalid!')
  })

  it('Deve exibir erro para senha incorreta', () => {
    cy.get('#username').type('tomsmith')

    cy.get('#password').type('SuperSecretPasswod!')

    cy.get('button[type="submit"]').click()

    cy.get('.flash.error').should('contain.text', 'Your password is invalid!')
  })

  it('Deve exibir erro para usuário e senha incorretos', () => {
    cy.get('#username').type('Bruno ')

    cy.get('#password').type('supersecretpasswod!')

    cy.get('button[type="submit"]').click()

    cy.get('.flash.error').should('contain.text', 'Your username is invalid!')
  })

})

describe('Teste de Validação de Campos Obrigatórios no Login', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login')
  })

  it('Deve exibir erro ao tentar enviar o formulário com ambos os campos vazios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.flash.error').should('contain.text', 'Your username is invalid!')
  })

  it('Deve exibir erro ao tentar enviar o formulário sem preencher o nome de usuário', () => {
    cy.get('#password').type('SuperSecretPassword!')

    cy.get('button[type="submit"]').click()

    cy.get('.flash.error').should('contain.text', 'Your username is invalid!')
  })

  it('Deve exibir erro ao tentar enviar o formulário sem preencher a senha', () => {
    cy.get('#username').type('tomsmith')

    cy.get('button[type="submit"]').click()

    cy.get('.flash.error').should('contain.text', 'Your password is invalid!')
  })

})
