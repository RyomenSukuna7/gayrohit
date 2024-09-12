import createKindeClient from "https://cdn.jsdelivr.net/npm/@kinde-oss/kinde-auth-pkce-js/+esm";

(async () => {
    const kinde = await createKindeClient({
        client_id: "be8f5969eca04865b1d872436d9ef836",
        domain: "https://nextunitech.kinde.com",
        redirect_uri: "https://gayrohit.vercel.app"
    });

    const user = kinde.getUser();
    
    if(!(user==undefined)){
        const mySidenav=document.getElementById("mySidenav");
        const p=document.createElement("p");
        document.getElementById("login").style.display="none";
        document.getElementById("register").style.display="none";
        
        p.textContent+=`user login: ${user.given_name}`;
        p.style.cssText+=`text-align:center;font-size:20px;`
        mySidenav.insertAdjacentElement("afterbegin",p);

    }

})();
