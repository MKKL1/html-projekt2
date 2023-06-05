import HomeView from "./views/HomeView.js";
import EditView from "./views/EditView.js";
import ShopView from "./views/ShopView.js";
import ProductView from "./views/ProductView.js";

//Zamienia ścieżke z routes do odpowiedniego regexa, dla /shop:page /^\/shop\/(.+)$/, natomiast /shop /^\/shop$/
//Regex uzywany do wyszkania parametrów w linku
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

//Czyta wszystkie parametry w linku i zwraca je jako obiekt
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: HomeView },
        { path: "/shop", view: ShopView },
        { path: "/shop/:page", view: ShopView },
        { path: "/edit", view: EditView },
        { path: "/product/:id", view: ProductView }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    //Jeżeli nie znajdzie odpowiedniego linku to przechodzi na stronę 404
    if (!match) {
        document.querySelector('#content').innerHTML = await fetch('/static/404.html').then(resp => resp.text());
        return;
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#content").innerHTML = await view.getHtml().then(resp => resp.text());
    await view.onStart();
};

//Zamiana przejścia na odpowiednią stronę po wpisaniu linku
window.addEventListener("popstate", router);

//Przejście na odpowiednią stronę po wciśnięciu elementu na stronie
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});