A simple MongoDB, Node/Express, and React+Vite project undertaken as
training for the MERN stack. Also, used dockerfiles and a docker-compose file to allow for containerization.

In addition, a university course required us to take a project and implement some of the SOLID principles where they were violated.

To start up the backend, navigate to the backend directory, run 'npm i' first, and then run 'npm start'.

For the frontend, navigate to the frontend directory, run 'npm i' first, and then run 'npm run dev'.

Update:

Project Refactoring Summary

Just wrapped up some major clean-up and improvements on our MERN stack app, focusing on making the code smarter, more flexible, and way easier to handle. Here's the breakdown:
Backend Upgrades

    Controllers: Cut down the fluff in controllers. Now, they just deal with requests and leave the heavy lifting to the new service layers.
    Service Layers: Introduced wizardService.js and authService.js to handle the core logic. Controllers are now chill, just passing on messages.
    Better Error Handling: Tightened up on catching and handling errors, so the app's more reliable.
    Ready for More: Made it easier to add new features without messing with the existing code. OCP woohooooo!

Frontend Facelift

    Hooks: Rolled out useWizards custom hook. It's neat for managing wizard stuff without cluttering components.
    Components: WizardsView.jsx is all about the UI now, leaving the brainy bits to hooks.
    API Calls: Moved API interactions out of the components to keep them clean and focused on looking good.

TL;DR

Basically, we've made both the backend and frontend more organized and super easy to update without tripping over old code. The app's now solid for both testing and adding new stuff, and it’s set up to grow without headaches.