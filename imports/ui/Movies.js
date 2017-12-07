import React, { Component } from 'react';
import { Movies } from '../api/movies.js';
import { Card } from 'antd';

export default class Movie extends Component {

    toggleChecked = () => {
        const { movie } = this.props;

        Movies.update(movie._id, {
            $set: { checked: !movie.checked },
        });
    };

    deleteThisMovie = () => {
        const { movie } = this.props;

        Movies.remove(movie._id);
    };

    render() {
        const { movie } = this.props;
        const moviesClassName = movie.checked ? 'checked' : '';

        return (
            <li className={moviesClassName}>
                <Card
                    hoverable
                    cover={<img alt="example" src="https://static.pexels.com/photos/247932/pexels-photo-247932.jpeg" />}
                >
                    <h3>{movie.title}</h3>
                    <p>Réalisateur : {movie.filmMaker}</p>
                    <p>ajout du film par : {movie.username}</p>

                    <input
                        type="checkbox"
                        readOnly
                        checked={!!movie.checked}
                        onClick={this.toggleChecked}
                    />

                    {/*si c'est son film ajouté, il peut le supprimer*/}
                    <button className="delete" onClick={this.deleteThisMovie}>
                        &times;
                    </button>

                    {/*date, durée, réal, note ?, likes ?*/}
                </Card>
            </li>
        );
    }
}