import createKindeClient from "https://cdn.jsdelivr.net/npm/@kinde-oss/kinde-auth-pkce-js/+esm";

(async () => {
    const kinde = await createKindeClient({
        client_id: "be8f5969eca04865b1d872436d9ef836",
        domain: "https://nextunitech.kinde.com",
        redirect_uri: "gayrohit.vercel.app"
    });

    document.getElementById("login").addEventListener("click", async () => {
        await kinde.login();
    });

    document.getElementById("register").addEventListener("click", async () => {
        await kinde.register();
    });

    document.getElementById("logout").addEventListener("click", async () => {
          await kinde.logout();
    });

    kinde.onRedirectCallback = (user, appState) => {
        console.log({ user, appState });
        if (user) {
            // Render logged-in view
        } else {
            // Render logged-out view
        }
    };
})();
