import { createEvent, createStore } from "effector";


export const $menuIsOpen = createStore(false);
export const toggleMenu = createEvent();
$menuIsOpen.on(toggleMenu, (isOpen) => !isOpen);
