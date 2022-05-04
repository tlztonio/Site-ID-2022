# Site des 20ans de MMI Tarbes

Ce site fonctionne avec webpack pour la gestion des dépendances, scss pour le style, Threejs pour la 3d avec des shaders WebGL,
l'intégralité des modèles 3D on était faits sur Blender.
Le projet contient de nombreux fichiers car j'ai choisi de faire de la programmation orientée objet, cette technique s'adapte très bien à la création d'une grande scène avec Threejs.

Le fonctionnement est le suivant, le fichier script principal est "script js", dans ce dernier j'importe l'objet "Expérience", dans ce dernier j'importe tous les elements nécessaires au bon fonctionnement de la 3D avec Threejs
(une scène, une caméra, un renderer, les ressources etc). Les éléments tels que les parasols, le concert, la mer etc. sont dans World, c'est dans ce fichier que je creer les objets dont j'ai besoin dans ma scène 3D.

Voici donc le fonctionnement géneral, sans trop rentrer dans les détails, si vous le souhaitez vous pouvez me contacter à l'adresse suivante andreas.pau64@gmail.com pour plus de précisions sur le projet.

Ci-dessous les instructions pour lancer le projet en local : 

## Setup
Telechargez [Node.js](https://nodejs.org/en/download/).
Lancez les commandes suivantes :

# Installer les dépendances (seulement la premiere fois)
npm install

# Lancer le serveur local sur localhost:8080
npm run dev


