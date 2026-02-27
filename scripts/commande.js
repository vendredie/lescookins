// --- Switch entre commande OG et Custom --- //

// Sélectionner les éléments
const buttons = document.querySelectorAll('.segmented-button__item');
const tabs = document.querySelectorAll('.tab-content');

// Écouter les clics
buttons.forEach(button => {
    button.addEventListener('click', () => {

        // 1. Récupérer le nom de l'onglet cliqué
        const tabName = button.dataset.tab;

        // 2.Retirer l'apparence "active" de tous les boutons
        buttons.forEach(btn => {
            btn.classList.remove('segmented-button__item--active');
        });

        // 3. Ajouter l'apparence "active" sur le bouton cliqué
        button.classList.add('segmented-button__item--active');

        //4. Retirer la classe "active" des 2 sections de contenu
        tabs.forEach(tab => {
            tab.classList.remove('tab-content--active');
        })

        //5. Ajouter la classe "active" sur la section correspondant au bouton cliqué :
        const activeTab = document.getElementById('tab-' + tabName);
        activeTab.classList.add('tab-content--active');

    });
});

// --------------------------------------------------------------------------------

// --- Counter buttons dynamiques --- //

// Sélectionner tous les counters
const counters = document.querySelectorAll('.counter');

// Fixer la limite max
const MAX_TOTAL = 4;

// Fonction pour calculer le total
function calculateTotal() {
    let total = 0;

    counters.forEach(counter => {
        const value = counter.querySelector('.counter__input').textContent;
        total += parseInt(value);
    });

    return total
}

// Fonction pour mettre à jour les boutons
function updateButtons() {
    const total = calculateTotal()

    counters.forEach(counter => {
        const minusBtn = counter.querySelector('.counter__button--minus');
        const plusBtn = counter.querySelector('.counter__button--plus');
        const value = parseInt(counter.querySelector('.counter__input').textContent);

        // Désactiver le bouton minus si valeur = 0
        if (value === 0) {
            minusBtn.classList.add('button--disabled');
        } else {
            minusBtn.classList.remove('button--disabled');
        }

        // Désactiver le bouton plus si total = 4
        if (total >= MAX_TOTAL) {
            plusBtn.classList.add('button--disabled');
        } else {
            plusBtn.classList.remove('button--disabled');
        }
    });
}

// Écouter les clics
counters.forEach(counter => {
    const minusBtn = counter.querySelector('.counter__button--minus');
    const plusBtn = counter.querySelector('.counter__button--plus');
    const valueSpan = counter.querySelector('.counter__input');

    // Au clic sur +
    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(valueSpan.textContent);
        const total = calculateTotal();

        if (total < MAX_TOTAL) {
            valueSpan.textContent = currentValue + 1 ;
            updateButtons();
        }
    });

    // Au clic sur -
    minusBtn.addEventListener('click',() => {
        const currentValue = parseInt(valueSpan.textContent);

        if (currentValue > 0) {
            valueSpan.textContent = currentValue - 1;
            updateButtons();
        }
    });
});

// Initialiser les boutons au chargement (toutes les valeurs à 0 et boutons - désactivés)
updateButtons();