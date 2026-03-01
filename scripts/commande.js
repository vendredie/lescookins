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
        });

        //5. Ajouter la classe "active" sur la section correspondant au bouton cliqué :
        const activeTab = document.getElementById('tab-' + tabName);
        activeTab.classList.add('tab-content--active');

    });
});

const boxType = window.location.hash
if (boxType === "#custom") {
    // 2.Retirer l'apparence "active" de tous les boutons
        buttons.forEach(btn => {
            btn.classList.remove('segmented-button__item--active');
        });

        // 3. Ajouter l'apparence "active" sur le bouton cliqué
        document.querySelector('[data-tab="custom"]').classList.add('segmented-button__item--active');;

        //4. Retirer la classe "active" des 2 sections de contenu
        tabs.forEach(tab => {
            tab.classList.remove('tab-content--active');
        });

        //5. Ajouter la classe "active" sur la section Custom :
        document.querySelector('#tab-custom').classList.add('tab-content--active');

}
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
    const total = calculateTotal();

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



// --------------------------------------------------------------------------------

// --- Validation de la boîte --- //

 const boxValidationButton = document.getElementById('box-validation-button');
 boxValidationButton.addEventListener('click', () => {
// Sélectionner la tab active
const activeTab = document.querySelector('.tab-content--active');
const activeTabId = activeTab.id;

// Fonction de validation : tab OG
if (activeTabId === "tab-og") {
    const total = calculateTotal();
    //Si total = 4, redirection vers le checkout
    if (total === MAX_TOTAL) {
        window.location.href = "checkout.html";
    } else {
    //Sinon, ajouter la classe "active" sur l'alerte':
        const alert = activeTab.querySelector('.alert');
        alert.classList.add('alert--active');
    }

    // Fonction de validation : tab Custom
} else {
    // Récupérer les valeurs des champs base, noix et nom
    const base = document.querySelector('input[name="pate"]:checked');
    const noix = document.querySelector('input[name="noix"]:checked');
    const nomRecette = document.getElementById('nom-recette');
    // Vérifier les champs un par un
    // Base
    if (base === null) {
        // Ajout des classes "error"
        document.querySelector('#step-base .custom-step__number').classList.add('custom-step__number--error');
        document.querySelector('#step-base .custom-step__mention').classList.add('custom-step__mention--error');
        document.querySelector('#step-base .custom-step__helper').classList.add('custom-step__helper--error');
        // Suppression des classes "error" au clic sur un autre élément du groupe
        document.querySelectorAll('input[name="pate"]').forEach(input => {
            input.addEventListener('change', () => {
                document.querySelector('#step-base .custom-step__number').classList.remove('custom-step__number--error');
                document.querySelector('#step-base .custom-step__mention').classList.remove('custom-step__mention--error');
                document.querySelector('#step-base .custom-step__helper').classList.remove('custom-step__helper--error');
                });
            });
    }
     // Noix
    if (noix === null) {
        document.querySelector('#step-noix .custom-step__number').classList.add('custom-step__number--error');
        document.querySelector('#step-noix .custom-step__mention').classList.add('custom-step__mention--error');
        document.querySelector('#step-noix .custom-step__helper').classList.add('custom-step__helper--error');
        // Suppression des classes "error" au clic sur un autre élément du groupe
        document.querySelectorAll('input[name="noix"]').forEach(input => {
            input.addEventListener('change', () => {
                document.querySelector('#step-noix .custom-step__number').classList.remove('custom-step__number--error');
                document.querySelector('#step-noix .custom-step__mention').classList.remove('custom-step__mention--error');
                document.querySelector('#step-noix .custom-step__helper').classList.remove('custom-step__helper--error');
                });
            });
    }
    // Nom de la recette
    if (nomRecette.value === "") {
        document.querySelector('#step-nom .custom-step__number').classList.add('custom-step__number--error');
        document.querySelector('#step-nom .custom-step__mention').classList.add('custom-step__mention--error');
        document.querySelector('#step-nom .custom-step__helper').classList.add('custom-step__helper--error');
         // Suppression des classes "error" au clic sur un autre élément du groupe
        nomRecette.addEventListener('input', () => {
          if (nomRecette.value !== "") {
                document.querySelector('#step-nom .custom-step__number').classList.remove('custom-step__number--error');
                document.querySelector('#step-nom .custom-step__mention').classList.remove('custom-step__mention--error');
                document.querySelector('#step-nom .custom-step__helper').classList.remove('custom-step__helper--error');
                };
            });
        }
    
    
     if (base === null || noix === null || nomRecette.value === "") {
        const alert = activeTab.querySelector('.alert');
        alert.classList.add('alert--active');
    }
    // Si oui ; alors on peut suivre le lien indiqué dans le bouton ; 
     else {
        window.location.href = "checkout.html";
    }
}

})

