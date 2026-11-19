import express from 'express';
import application from './app/index.js';

// La entrada raíz permite que Vercel detecte Express y agrupe sus rutas en una función.
// La importación de Express aquí es intencional para la detección del framework.
void express;

export default application;
