
describe('service is available', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        // cy.intercept("GET", "api/auth/token", { fixture: "authResponse.json" });
       // cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("GET", "api/ingredients", { fixture: "IngredientResponse.json" });
        cy.get("div[data-test='ingr']").as('ListOfIngr');
        cy.get("div[data-test='dropArea']").as('DropArea');

    });

    it('check ingredients are loaded on page', function (){
        cy.get('@ListOfIngr').eq(0).as('bun');
        cy.get('@bun').should('have.length', 1);
        cy.get('@ListOfIngr').eq(2).as('main');
        cy.get('@main').should('have.length', 1);
        cy.get('@ListOfIngr').eq(1).as('sauce');
        cy.get('@sauce').should('have.length', 1);
    });

    it('try to open modal window', function (){
        cy.get('@ListOfIngr').eq(0).click();
        cy.wait(2000);
        cy.get("p[class='mt-1 text text_type_main-medium']").contains("Тестовая булочка");
        cy.get("div[data-test='closeWindow']").click();
    })

    it('check that drop area exists', function (){

        cy.get('@DropArea').contains('Добавьте игредиенты в бургер');
    })

    it('try drag and drop ingredients', function (){
        cy.get('@ListOfIngr').eq(0).trigger('dragstart');
        cy.get('@DropArea').trigger('drop');

        cy.get('@ListOfIngr').eq(1).trigger('dragstart');
        cy.get('@DropArea').trigger('drop');

        cy.get('@ListOfIngr').eq(2).trigger('dragstart');
        cy.get('@DropArea').trigger('drop');


    })

    it('try to send order', function (){
        cy.get('@ListOfIngr').eq(0).trigger('dragstart');
        cy.get('@DropArea').trigger('drop');
        cy.get('button').contains('Оформить заказ').click();
        cy.get('input[name=email]').type("CYtest@yandex.ru");
        cy.get('input[name=password]').type("P@$$w0rd");
        cy.get('button').contains('Войти').click();
        cy.intercept("POST", "api/auth/login", { fixture: "user.json" });
        cy.get('button').contains('Оформить заказ').click();
        cy.intercept("POST", "api/orders", { fixture: "OrderResponse.json" });
        cy.wait(2000);
        cy.get('p[class="text text_type_digits-large"]').contains("3000");
        cy.get("div[data-test='closeWindow']").click();

    })

});