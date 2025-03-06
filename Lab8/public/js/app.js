const products = [
    { price: 999.99, max: 5 },
    { price: 1999.99, max: 3 },
    { price: 349.99, max: 4 }
];

// Función para incrementar cantidad
function incrementQuantity(productId) {
    const input = document.getElementById(`quantity${productId}`);
    const currentValue = parseInt(input.value);
    if (currentValue < products[productId-1].max) {
        input.value = currentValue + 1;
        input.style.backgroundColor = '#e2e8f0';
        setTimeout(() => {
            input.style.backgroundColor = 'white';
        }, 200);
        updateTotal();
    } else {
        alert(`Máximo ${products[productId-1].max} unidades por cliente`);
    }
}

// Función para decrementar cantidad
function decrementQuantity(productId) {
    const input = document.getElementById(`quantity${productId}`);
    const currentValue = parseInt(input.value);
    if (currentValue > 0) {
        input.value = currentValue - 1;
        input.style.backgroundColor = '#e2e8f0';
        setTimeout(() => {
            input.style.backgroundColor = 'white';
        }, 200);
        updateTotal();
    }
}

// Función para mostrar/ocultar detalles
function toggleDetails(productId) {
    const details = document.getElementById(`details${productId}`);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        document.querySelector(`.product-card:nth-child(${productId}) .btn-success`).textContent = 'Ocultar Detalles';
    } else {
        details.style.display = 'none';
        document.querySelector(`.product-card:nth-child(${productId}) .btn-success`).textContent = 'Ver Detalles';
    }
}

// Función para actualizar el total
function updateTotal() {
    let subtotal = 0;
    for (let i = 1; i <= 3; i++) {
        const quantity = parseInt(document.getElementById(`quantity${i}`).value);
        subtotal += products[i-1].price * quantity;
    }
    
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('iva').textContent = iva.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    // Efecto visual en el total
    const totalElement = document.getElementById('total');
    totalElement.style.backgroundColor = '#fef3c7';
    setTimeout(() => {
        totalElement.style.backgroundColor = 'transparent';
    }, 300);
}

// Event listeners para efectos adicionales
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        document.getElementById('subtitle').textContent = `¡Explora nuestro ${['Smartphone', 'Laptop', 'Smartwatch'][index]}!`;
        document.getElementById('subtitle').style.color = '#4299e1';
    });

    card.addEventListener('mouseleave', () => {
        document.getElementById('subtitle').textContent = 'Los mejores productos tech al mejor precio';
        document.getElementById('subtitle').style.color = 'white';
    });
});