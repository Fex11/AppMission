# Étape 1 : Choisir l'image de base
FROM node:20

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers de l'application
COPY . .

# Étape 6 : Exposer le port de développement
EXPOSE 3001

# Étape 7 : Lancer l'application en mode développement
CMD ["npm", "start"]
