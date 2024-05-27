let ingredients = [];
let burgers = [];

function addIngredient() {
    const name = document.getElementById('ingredientName').value.trim();
    const weight = parseFloat(document.getElementById('ingredientWeight').value);
    const price = parseFloat(document.getElementById('ingredientPrice').value);

    if (name && !isNaN(weight) && weight > 0 && !isNaN(price) && price > 0) {
        const exists = ingredients.some(ingredient => ingredient.name === name);
        if (!exists) {
            ingredients.push({ name, weight, price });
            document.getElementById('ingredientMessage').innerText = 'Ingrediente adicionado com sucesso!';
        } else {
            document.getElementById('ingredientMessage').innerText = 'Ingrediente já existe no blend!';
        }
    } else {
        document.getElementById('ingredientMessage').innerText = 'Preencha todos os campos corretamente!';
    }
}

function prepareBlend() {
    const burgerName = document.getElementById('burgerName').value.trim();
    if (burgerName && ingredients.length >= 2) {
        let totalWeight = 0;
        let totalPrice = 0;
        let blendSummary = `PREPARANDO NOVO HAMBURGUER\n`;

        ingredients.forEach((ingredient, index) => {
            const finalPrice = (ingredient.weight / 1000) * ingredient.price;
            totalWeight += ingredient.weight;
            totalPrice += finalPrice;
            blendSummary += `${index + 1} – Ingrediente: ${ingredient.name} – Peso: ${ingredient.weight}g – Preço KG: R$${ingredient.price.toFixed(2)} – Preço Final: R$${finalPrice.toFixed(2)}\n`;
        });

        blendSummary += `\nINFORMAÇÕES DO HAMBURGUER REGISTRADO NO CATÁLOGO:\n`;
        blendSummary += `Nome: ${burgerName}\n`;
        blendSummary += `Peso Total: ${totalWeight}g\n`;
        blendSummary += `Preço Total: R$${totalPrice.toFixed(2)}`;

        burgers.push({ name: burgerName, weight: totalWeight, price: totalPrice });
        document.getElementById('blendMessage').innerText = blendSummary;

        updateBurgerOptions();
    } else {
        document.getElementById('blendMessage').innerText = 'Nome do hamburguer não inserido ou menos de 2 ingredientes adicionados!';
    }
}

function updateBurgerOptions() {
    const burgerSelect = document.getElementById('burgerType');
    burgerSelect.innerHTML = '';
    burgers.forEach(burger => {
        const option = document.createElement('option');
        option.value = burger.name;
        option.text = `${burger.name} (${burger.weight}g / R$${burger.price.toFixed(2)})`;
        burgerSelect.add(option);
    });
}

function showMenuCreation() {
    if (burgers.length > 0) {
        document.getElementById('menuCreation').style.display = 'block';
    } else {
        document.getElementById('menuMessage').innerText = 'Nenhum blend de hamburguer registrado no catálogo!';
    }
}

function addSandwich() {
    const burgerType = document.getElementById('burgerType').value;
    const burgerQuantity = parseInt(document.getElementById('burgerQuantity').value);
    const cheeseType = parseFloat(document.getElementById('cheeseType').value);
    const onion = parseFloat(document.getElementById('onion').value);
    const lettuce = parseFloat(document.getElementById('lettuce').value);
    const tomato = parseFloat(document.getElementById('tomato').value);

    const selectedBurger = burgers.find(burger => burger.name === burgerType);

    if (selectedBurger && burgerQuantity > 0) {
        const totalBurgerPrice = selectedBurger.price * burgerQuantity;
        const additionalPrice = cheeseType + onion + lettuce + tomato;
        const finalPrice = totalBurgerPrice + additionalPrice;

        const sandwichSummary = `
            Tipo Hamburguer: ${selectedBurger.name} (${selectedBurger.weight}g / R$${selectedBurger.price.toFixed(2)})\n
            Quantidade de Hamburgueres: ${burgerQuantity} x\n
            Queijo: ${document.getElementById('cheeseType').selectedOptions[0].text}\n
            Cebola: ${document.getElementById('onion').selectedOptions[0].text}\n
            Alface: ${document.getElementById('lettuce').selectedOptions[0].text}\n
            Tomate: ${document.getElementById('tomato').selectedOptions[0].text}\n
            Preço Final do Lanche: R$${finalPrice.toFixed(2)}
        `;

        document.getElementById('menuMessage').innerText = sandwichSummary;
    } else {
        document.getElementById('menuMessage').innerText = 'Tipo de hambúrguer não existe ou quantidade inválida!';
    }
}
