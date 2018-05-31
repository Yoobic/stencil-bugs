import { Model, Searchable, Editable } from '@shared/data-core';
import { ISubscription, FormFieldType } from '@shared/interfaces';

let user1Value: string = '1 utilisateur - 420€/an';
let user2Value: string = '2 utilisateurs - 588€/an';
let user3Value: string = '3 utilisateurs - 708€/an';

let conditions = {
    condition1: { type: 'field', field: { name: 'type', type: FormFieldType.select }, operator: 'in', values: [user1Value, user2Value, user3Value] },
    condition2: { type: 'field', field: { name: 'type', type: FormFieldType.select }, operator: 'in', values: [user2Value, user3Value] },
    condition3: { type: 'field', field: { name: 'type', type: FormFieldType.select }, operator: 'in', values: [user3Value] }
};

@Model({
    className: 'Subscription',
    collectionName: 'subscription'
})
export class Subscription extends ISubscription {
    static user1Value: string = user1Value;
    static user2Value: string = user2Value;
    static user3Value: string = user3Value;

    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.autocomplete, values: [user1Value, user2Value, user3Value], description: 'Sélectionnez un forfait et complétez les informations sur les utilisateurs afin que YOOBIC puisse créer vos comptes d’accès.' })
    @Searchable('Subscription') type: string;

    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.text, required: true, description: 'Utilisateur 1 - Prénom & Nom', condition: conditions.condition1 })
    @Searchable('Subscription') user1Name: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.text, required: true, description: 'Utilisateur 1 - Fonction', condition: conditions.condition1 })
    @Searchable('Subscription') user1Function: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.email, required: true, description: 'Utilisateur 1 - Adresse email', condition: conditions.condition1 })
    @Searchable('Subscription') user1Email: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.tel, required: true, description: 'Utilisateur 1 - Numéro de téléphone', condition: conditions.condition1 })
    @Searchable('Subscription') user1Tel: string;

    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.text, required: true, description: 'Utilisateur 2 - Prénom & Nom', condition: conditions.condition2 })
    @Searchable('Subscription') user2Name: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.text, required: true, description: 'Utilisateur 2 - Fonction', condition: conditions.condition2 })
    @Searchable('Subscription') user2Function: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.email, required: true, description: 'Utilisateur 2 - Adresse email', condition: conditions.condition2 })
    @Searchable('Subscription') user2Email: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.tel, required: true, description: 'Utilisateur 2 - Numéro de téléphone', condition: conditions.condition2 })
    @Searchable('Subscription') user2Tel: string;

    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.text, required: true, description: 'Utilisateur 3 - Prénom & Nom', condition: conditions.condition3 })
    @Searchable('Subscription') user3Name: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.text, required: true, description: 'Utilisateur 3 - Fonction', condition: conditions.condition3 })
    @Searchable('Subscription') user3Function: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.email, required: true, description: 'Utilisateur 3 - Adresse email', condition: conditions.condition3 })
    @Searchable('Subscription') user3Email: string;
    @Editable('Subscription', { tab: 'Option choisie', tabIndex: 1, type: FormFieldType.tel, required: true, description: 'Utilisateur 3 - Numéro de téléphone', condition: conditions.condition3 })
    @Searchable('Subscription') user3Tel: string;

    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.text, required: true, description: 'Nom du Point de Vente (raison sociale)' })
    @Searchable('Subscription') storeName: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.text, required: true, description: 'Prénom et nom du dirigeant' })
    @Searchable('Subscription') storeOwner: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.textarea, required: true, description: 'Adresse du Point de Vente' })
    @Searchable('Subscription') storeAddress: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.tel, required: true, description: 'Numéro de téléphone' })
    @Searchable('Subscription') storeTelephone: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.number, required: true, description: 'N° de Siren' })
    @Searchable('Subscription') storSiren: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.text, required: true, description: 'N° de compte RRDI (6 chiffres + 1 lettre)' })
    @Searchable('Subscription') storeRRDI: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.text, required: true, description: 'N° de TVA Intracommunautaire' })
    @Searchable('Subscription') storeTVA: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.text, required: true, description: 'Nom et prénom du signataire' })
    @Searchable('Subscription') signatureName: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.text, required: true, description: 'Fait à' })
    @Searchable('Subscription') signaturePlace: string;
    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.date, required: true, description: 'Le' })
    @Searchable('Subscription') signatureDate: string;

    @Editable('Subscription', {
        tab: 'Bulletin d\'adhésion',
        tabIndex: 2,
        type: FormFieldType.information,
        value: 'YOOBIC LTD concède, pendant la durée de chaque abonnement, un droit d’utilisation non exclusif, non cessible et non transférable de la Solution YOOBIC. La durée ferme, irrévocable et minimale de l\'abonnement est fixée à douze (12) mois et à compter de la date de paiement. Il se renouvellera ensuite par tacite reconduction pour des durées fermes et irrévocables identiques sauf dénonciation par lettre recommandée avec accusé de réception moyennant un préavis de trois (3) mois avant le renouvellement de l’abonnement concerné.Attention : L’application YOOBIC fonctionne avec la géolocalisation, les licences achetées fonctionneront donc uniquement dans votre point de vente.<br/>Signature'
    })
    cgv: any;

    @Editable('Subscription', { tab: 'Bulletin d\'adhésion', tabIndex: 2, type: FormFieldType.checkbox, required: true, title: 'J\'ai lu et j\'accepte les Conditions Générales de Vente disponibles en cliquant sur le lien suivant: <a target="about:blank" href="https://res.cloudinary.com/www-yoobic-com/raw/upload/v1490220673/CGVCitroen01032017_j3cvg0.pdf">Condition Générales</a>' }) @Searchable('Subscription')
    conditions: boolean;

    @Editable('Subscription', {
        tab: 'Bulletin d\'adhésion',
        tabIndex: 2,
        type: FormFieldType.signature,
        required: true,
        description: 'Signature'
    }) signature: string;

    @Editable('Subscription', { tab: 'Paiement', tabIndex: 3, type: FormFieldType.text, required: true, description: 'Entrez l\'addresse email de réception de la facture' }) @Searchable('Subscription') emailReceipt: string;
    @Editable('Subscription', { tab: 'Paiement', tabIndex: 3, type: FormFieldType.stripecard, required: true, description: 'CREDITCARD' }) @Searchable('Subscription') cardToken: any;
}
