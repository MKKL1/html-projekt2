import HomeView from "./views/HomeView.js";
import EditView from "./views/EditView.js";
import ShopView from "./views/ShopView.js";

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = [
    { path: "/", view: HomeView },
    { path: "/edit", view: EditView },
    { path: "/shop", view: ShopView }
];

const handleLocation = async () => {
    const path = window.location.pathname;
    const view = routes.find(x => x.path === path).view
    const viewobject = new view()
    document.getElementById("content").innerHTML = await viewobject.getHtml().then(resp => resp.text());
    await viewobject.onStart();
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();