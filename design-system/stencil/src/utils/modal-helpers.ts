import { OverlayEventDetail } from '@ionic/core/dist/types/utils/overlays';

export async function showModal(component: string | Function | HTMLElement, options?: any): Promise<OverlayEventDetail> {
    return new Promise((resolve, reject) => {
        // initialize controller
        const modalController = document.querySelector('ion-modal-controller');
        modalController.componentOnReady().then(() => {
            modalController.create({
                component: component,
                componentProps: options
            }).then(modal => {
                modal.onDidDismiss((ret) => {
                    resolve(ret);
                });
                modal.present();
            });
        });
    });
}