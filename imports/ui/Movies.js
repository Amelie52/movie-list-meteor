import React, { Component } from 'react';
import { Movies } from '../api/movies.js';
import { Card, Button, Icon } from 'antd';

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
                    actions={[<Icon type="delete" style={{ color: '#ff4d4f' }} onClick={this.deleteThisMovie} />, <Icon type="edit" />]}
                >
                    <h3>{movie.title}</h3>
                    vu <input
                        type="checkbox"
                        readOnly
                        checked={!!movie.checked}
                        onClick={this.toggleChecked}
                    />
                    <p>Réalisateur : {movie.filmMaker}</p>
                    <p>Date de sortie : {movie.filmDate}</p>
                    <p>Genre : {movie.filmGenre}</p>
                    <p>ajout du film par : {movie.username}</p>
                    <p>Synopsis: <br/> {movie.filmSynopsis}</p>
                </Card>
            </li>
        );
    }
}