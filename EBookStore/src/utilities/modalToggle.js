import { Modal, Ripple, initTE } from 'tw-elements';
initTE({ Modal, Ripple });


export const myModal = () =>
    new Modal(document.getElementById('rightTopModal'));

export const initialModal = (myModal) => {
    myModal.toggle();
};
