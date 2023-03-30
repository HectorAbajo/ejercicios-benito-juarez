import { GestorClub } from "./GestorClub";

const pacman: GestorClub = new GestorClub();
pacman.agregarSocio();
pacman.agregarSocio();
pacman.agregarSocio();
// console.log(pacman.dato())
console.log(pacman.filtroNombre("Julian"))