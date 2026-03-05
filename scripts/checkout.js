// --- Dynamisation des champs "delivery mode"---------------------------------------------------------------------- //

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


// --- Récap de commande ------------------------------------------------------------------------------------------ //

// 1. Lire et parser les données du localStorage
const commande = JSON.parse(localStorage.getItem('commande'));

// 2. Sélectionner les éléments du DOM
const recapTitle = document.getElementById('recap-title');
const recapOG = document.getElementById('recap-og');
const recapCustom = document.getElementById('recap-custom');

// 3. Selon le type de commande, afficher le bon recap
if (commande.type === "og") {

    // Mettre à jour le titre
    recapTitle.textContent = "Ta commande : 4 cookins originaux";
    
    // Afficher le wrapper OG
    recapOG.classList.add('order-recap__wrapper--active');
    
    // Vider le contenu statique du HTML et le reconstruire dynamiquement
    recapOG.innerHTML = "";
    
    commande.cookins.forEach((cookin, index) => {
        // Créer un item par cookin
        recapOG.innerHTML += `
            <div class="order-recap__item">
                ${cookin.nom}
                <span class="order-recap__value">× ${cookin.quantite}</span>
            </div>
            ${index < commande.cookins.length - 1 ? '<span class="separator"></span>' : ''}
        `;
    });

} else {

    // Mettre à jour le titre
    recapTitle.textContent = `Ta commande : 4 cookins ${commande.nom}`;

    // Afficher le wrapper Custom
    recapCustom.classList.add('order-recap__wrapper--active');

    // Construire le contenu custom
    const chocolats = commande.chocolats.length > 0 ? commande.chocolats.join(' + ') : 'Sans chocolat';
    const noix = commande.noix ? commande.noix : 'Sans noix';

    recapCustom.innerHTML = `
        <div class="order-recap__item">Base<span class="order-recap__value">${commande.base}</span></div>
        <span class="separator"></span>
        <div class="order-recap__item">Chocolat(s)<span class="order-recap__value">${chocolats}</span></div>
        <span class="separator"></span>
        <div class="order-recap__item">Noix<span class="order-recap__value">${noix}</span></div>
    `;
}

