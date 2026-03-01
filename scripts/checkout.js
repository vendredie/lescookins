document.querySelectorAll('input[name="delivery-mode"]').forEach(input => {
    input.addEventListener('change', () => {
       const deliveryMode = document.querySelector('input[name="delivery-mode"]:checked');
       if (deliveryMode.value === "domicile") {
        document.querySelector('#delivery-fields').classList.add('delivery-fields--active');
       }
       else {
        document.querySelector('#delivery-fields').classList.remove('delivery-fields--active');
       }
    });
})