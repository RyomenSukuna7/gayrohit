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
        const prompt=document.getElementById("prompt").style.display="block";
        const button=document.getElementsByClassName("button1");
        for(let dis of button){
            dis.style.display="block"
        }
        document.getElementById("login").style.display="none";
        document.getElementById("register").style.display="none";
        
        p.textContent+=`user login: ${user.given_name}`;
        p.style.cssText+=`text-align:center;font-size:20px;`
        mySidenav.insertAdjacentElement("afterbegin",p);

    }
    else{
        const prompt=document.getElementById("prompt").style.display="none"; 
        const button=document.getElementsByClassName("button1");
        for(let dis of button){
            dis.style.display="none"
        }

        const a1=document.createElement("a");
        const a2=document.createElement("a");
        const form=document.getElementById("chat-form");
        a1.setAttribute("href","#");
        a2.setAttribute("href","#");
        a1.textContent="Register";
        a2.textContent="Sign in";

        a1.style.cssText+=`text-decoration:none;color:white;text-align:center;font-size:20px;`;
        a2.style.cssText+=`text-decoration:none;color:white;text-align:center;margin-left:6vw;font-size:20px;`;

        form.style.cssText+=`display:flex;justify-content:center;`

        form.appendChild(a1);
        form.appendChild(a2);

        a1.addEventListener("click", async () => {
            await kinde.login();
        });
    
        a2.addEventListener("click", async () => {
            await kinde.register();
        });
    }

})();
