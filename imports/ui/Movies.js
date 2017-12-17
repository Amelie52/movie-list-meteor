import React, { Component } from 'react';
import { Movies } from '../api/movies.js';
import { Button, Icon, Switch, Divider, Tag, Card, Popconfirm, message } from 'antd';
import { Meteor } from 'meteor/meteor';

export default class Movie extends Component {

    toggleChecked = () => {
        const { movie } = this.props;

        Meteor.call('movies.setChecked', movie._id, !movie.checked);
    };

    deleteThisMovie = () => {
        const { movie } = this.props;

        Meteor.call('movies.remove', movie._id);
    };

    confirm = () => {
        this.deleteThisMovie();
        message.success('Film supprimé');
    };

    getDeleteElement = () => {
        return (
            <Popconfirm title="Êtes-vous sûr de vouloir supprimer ce film ?" onConfirm={this.confirm} okText="Oui" cancelText="Annuler">
                <Icon type="delete" style={{ color: '#ff4d4f' }} />
            </Popconfirm>
        );

    };

    render() {
        const { movie } = this.props;
        const moviesClassName = movie.checked ? 'checked' : '';

        return (
            <li className={moviesClassName}>
                <Card
                    hoverable
                    cover={<img alt="example" src="https://static.pexels.com/photos/247932/pexels-photo-247932.jpeg" />}
                    actions={[
                        this.getDeleteElement(),
                        <Switch onChange={this.toggleChecked} checked={!!movie.checked} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                    ]}
                >
                    <p><span className="movie-title">{movie.title}</span></p>
                    <p><Icon type="user" /> {movie.filmMaker}</p>
                    <p><Icon type="tag-o" /> {movie.filmGenre}</p>
                    <p><Icon type="calendar" /> {movie.filmDate}</p>
                    <Divider>Synopsis</Divider>
                    <p>{movie.filmSynopsis}</p>
                </Card>
            </li>
        );
    }
}