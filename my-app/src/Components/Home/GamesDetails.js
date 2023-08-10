import morpion from '../../assets/images/Games/morpion.png';
import lependu from '../../assets/images/Games/lependu.png';
import memory from '../../assets/images/Games/memory.png';
import sudoku from '../../assets/images/Games/sudoku.png';
import snake from '../../assets/images/snokiaback.png';


export const games = [
    {
        id:1,
        picture: lependu,
        name: 'Le pendu',
        description: 'Jeu de devinette',
        url:'/lependu'
    },
    {
        id:2,
        picture: morpion,
        name: 'Morpion',
        description: 'Jeu de réflexion',
        url:'/morpion'
    },
    {
        id:3,
        picture: snake,
        name: 'Snake',
        description: 'Jeu d\'arcade',
        url:'/snake'
    },
    {
        id:4,
        picture: memory,
        name: 'Memory',
        description: 'Jeu de mémoire',
        url:'/memory'
    },
    {
        id:5,
        picture: sudoku,
        name: 'Sudoku',
        description: 'Jeu de logique',
        url:'/sudoku'
    }
];