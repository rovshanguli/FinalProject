import "../../../assets/sass/favorites.scss"
import NotFavorites from "./favoritescomponent/NotFavorites";
import BorderFavorites from "./favoritescomponent/BorderFavorites";


function Favorites() {
    
    let favorites;
    let favorit = JSON.parse(localStorage.getItem('favorites'));
    if (favorit?.length === 0 || favorit == null) {
        favorites = <NotFavorites />
    } else {
        favorites = <BorderFavorites />
    }

    return (
        <div>
            {favorites}
        </div>
    )
}

export default Favorites