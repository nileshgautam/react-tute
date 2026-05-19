import React, { useState } from "react";
import './BollyWoodMovie.css';

const bollyWoodMovies = [
    {
        id: 1,
        title: "3 Idiots",
        rating: 9.5,
        genre: "Comedy, Drama",
        year: 2009,
        director: "Rajkumar Hirani",
        image: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg",
        cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
    },
    {
        id: 2,
        title: "Lagaan",
        rating: 8.1,
        genre: "Drama, Sports",
        year: 2001,
        director: "Ashutosh Gowariker",
        image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Lagaan.jpg",
        cast: ["Aamir Khan", "Gracy Singh", "Raghuvir Yadav"],
    },
    {
        id: 3,
        title: "Taare Zameen Par",
        rating: 8.4,
        genre: "Drama, Family",
        year: 2007,
        director: "Aamir Khan",
        image: "https://upload.wikimedia.org/wikipedia/en/b/b4/Taare_Zameen_Par_Like_Stars_on_Earth_poster.png",
        cast: ["Darsheel Safary", "Aamir Khan", "Tisca Chopra"],
    },
    {
        id: 4,
        title: "Dangal",
        rating: 8.4,
        genre: "Biography, Drama, Sport",
        year: 2016,
        director: "Nitesh Tiwari",
        image: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg",
        cast: ["Aamir Khan", "Sakshi Tanwar", "Fatima Sana Shaikh"],
    },
    {
        id: 5,
        title: "Kabhi Khushi Kabhie Gham",
        rating: 7.4,
        genre: "Drama, Romance",
        year: 2001,
        director: "Karan Johar",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHK2C0l1hIsnFJvBmCNfhduvm6zYDigC8AD_80u9KCZvSnhtbw",
        cast: ["Amitabh Bachchan", "Shah Rukh Khan", "Kajol"],
    },
    {
        id: 6,
        title: "Swades",
        rating: 8.1,
        genre: "Drama",
        year: 2004,
        director: "Ashutosh Gowariker",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQNDFD-fGFwZ4_kNjnGCfuJi4gtT2cd8pWhlyBhDI7_FEMRJscy",
        cast: ["Shah Rukh Khan", "Gayatri Joshi", "Kishori Ballal"],
    },
    {
        id: 7,
        title: "Queen",
        rating: 8.2,
        genre: "Comedy, Drama",
        year: 2014,
        director: "Vikas Bahl",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS2AhKeea-p4V7NJdojOiYGTk75z6ovepnZlemD_JkS1HBBYsNb",
        cast: ["Kangana Ranaut", "Rajkummar Rao", "Lisa Haydon"],
    },
    {
        id: 8,
        title: "Zindagi Na Milegi Dobara",
        rating: 8.2,
        genre: "Adventure, Drama, Romance",
        year: 2011,
        director: "Zoya Akhtar",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQqOb7SYCekBWHrdqpplOSANdbjx-tff4WH6_-wxTtFY9viR4UU",
        cast: ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol"],
    },
    {
        id: 9,
        title: "Barfi!",
        rating: 8.1,
        genre: "Comedy, Drama, Romance",
        year: 2012,
        director: "Anurag Basu",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRtgs5mDLnQXzqioMkwbCtjqNjhWmS-39ls2UfM-Mjxq77u9JAa",
        cast: ["Ranbir Kapoor", "Priyanka Chopra", "Ileana D'Cruz"],
    },
    {
        id: 10,
        title: "Gully Boy",
        rating: 8.0,
        genre: "Drama, Music",
        year: 2019,
        director: "Zoya Akhtar",
        image: "https://upload.wikimedia.org/wikipedia/en/0/07/Gully_Boy_poster.jpg",
        cast: ["Ranveer Singh", "Alia Bhatt", "Siddhant Chaturvedi"],
    },
];

function BollyWoodMovie() {
    //State for Loading indicator
    const [loading, setLoading] = useState(false);

    // Sate for filtering
    const [selectedGenre, setSelectedGenre] = useState('All');
    // State for movies
    const [movies, setMovies] = useState(bollyWoodMovies);
    // State for search term
    const [searchTerm, setSearchTerm] = useState('');
    // State for sort by
    const [sortBy, setSortBy] = useState('title');

    // {condition && <component/>}

    const getRatingCategory = (rating) => {
        if (rating >= 9) return 'blockbuster';
        if (rating >= 8.5) return 'superhit';
        if (rating >= 7.5) return 'hit';
        return 'avarage';
    }


    const filteredMovies = movies.filter(movie => {
        const searchLower = searchTerm.toLowerCase();


        const matchesSearches = movie.title.toLowerCase().includes(searchLower) ||
            movie.genre.toLowerCase().includes(searchLower) ||
            movie.director.toLowerCase().includes(searchLower) ||
            movie.cast.some(actor =>
                actor.toLowerCase().includes(searchLower)
            ) ||
            movie.year.toString().includes(searchLower);

        const matchesGenres = selectedGenre === 'All' || movie.genre === selectedGenre;

        return (matchesSearches && matchesGenres);
    });

    const genres = ['All', ... new Set(movies.map(movie => movie.genre))];




    return (
        <section className="bollywood-movie">
            <h1>Bollywood Movie</h1>
            {
                loading ? (
                    <div className="loading-spiner">
                        <p>Loading bollywood movies...</p>
                    </div>
                ) :
                    (
                        <div className="main-container">

                            <div className="search-section">
                                <input type="text"
                                    placeholder="Search Bollywood movies...."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            {
                                searchTerm && (
                                    <p className="search-result">
                                        Founded {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} for "{searchTerm}"
                                    </p>)
                            }

                            <div className="filter-search">
                                <h4>Filter by category: </h4>
                                <div className="genre-buttons">
                                    {genres.map((genre) => (
                                        <button key={genre} className={`genre-button ${selectedGenre === genre ? 'active' : ''} `}
                                            onClick={() => setSelectedGenre(genre)}
                                        >{genre}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="movies-grid">
                                {
                                    filteredMovies.length > 0 ? (
                                        filteredMovies.map((movie) => (
                                            <div className={`movie-card ${getRatingCategory(movie.rating)}`} key={movie.id} >
                                                <img src={movie.image} alt={`${movie.title} poster`}
                                                    className="movie-image" />
                                                <h3 className="movie-title">{movie.title}</h3>
                                                <p className="movie-year">{movie.year}</p>
                                                <p className="movie-genre">{movie.genre}</p>
                                                <p className="movie-director">Dir. :  {movie.director}</p>
                                                <p className="movie-cast"> Cast : {movie.cast.join(', ')}</p>
                                                <p className={`movie-rating rating-${getRatingCategory(movie.rating)}`}>{movie.rating}/10</p>
                                            </div>

                                        ))) : (
                                        <div className="empty-sate">
                                            <h4>No Match Found</h4>
                                        </div>
                                    )

                                }
                            </div>

                        </div>
                    )
            }
        </section >
    );
}

export default BollyWoodMovie;
