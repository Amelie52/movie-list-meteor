import * as React from 'react';
import ReactDOM from 'react-dom';
import { Movies } from '../api/movies';
import { Meteor } from 'meteor/meteor';
import { Button, Icon } from 'antd';

export class AddMovieForm extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const { titleInput, filmMakerInput } = this.refs;

        const title = ReactDOM.findDOMNode(titleInput).value.trim();
        const filmMaker = ReactDOM.findDOMNode(filmMakerInput).value.trim();
        Movies.insert({
            title: title,
            filmMaker: filmMaker,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        // Clear form
        ReactDOM.findDOMNode(titleInput).value = '';
        ReactDOM.findDOMNode(filmMakerInput).value = '';
    };


    render() {
        return (
            <div>
                { this.props.currentUser &&
                <div>
                    <Button type="primary" size="large"><Icon type="plus"/>Ajouter un film</Button>

                    <form className="new-movie" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            ref="titleInput"
                            placeholder="Titre"
                        />

                        <input
                            type="text"
                            ref="filmMakerInput"
                            placeholder="Réalisateur"
                        />
                        <input type="submit"/>
                        {/*select, genre, durée, date sortie*/}
                    </form>
                </div>
                }
            </div>

        )
    }
}

export default AddMovieForm;

