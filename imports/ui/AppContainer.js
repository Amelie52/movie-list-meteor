import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Layout, Row, Col, Card, Button, Icon } from 'antd';
import { withTracker } from 'meteor/react-meteor-data';
import { Movies } from '../api/movies';
import Nav from './Nav';
import Movie from './Movies';
import AddMovieForm from './AddMovieForm';

const { Content } = Layout;
import 'antd/dist/antd.css';

// App component - represents the whole app
class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    toggleHideCompleted = () => {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    };

    renderMovies = () => {
        const { movies } = this.props;
        const { hideCompleted } = this.state;

        let filteredMovies = movies;
        if (hideCompleted) {
            filteredMovies = filteredMovies.filter(movie => !movie.checked);
        }

        return filteredMovies.map((movie) => (
            <Col span={6} key={movie._id} className="movie-card">
                <Movie movie={movie} />
            </Col>
        ));
    };

    render() {
        const { incompleteCount, currentUser } = this.props; // deconstruction

        return (
            <Layout>
                <header>
                    <Nav />
                </header>

                <Content>
                    <section className="intro__content">
                        <div className="container">
                            <h1>Films ({incompleteCount})</h1>
                            <em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci architecto aut
                                cumque deserunt ea, fugiat id molestias obcaecati officiis possimus quidem recusandae reiciendis
                                repellat repudiandae sit tenetur unde voluptatem!
                            </em>
                        </div>
                    </section>

                    <section>
                        <div className="container">
                            <AddMovieForm currentUser={currentUser} />

                            <Row gutter={20}>
                                <div>
                                    <h2>Ma liste de film</h2>
                                    <label className="hide-completed">
                                        <input
                                            type="checkbox"
                                            readOnly
                                            checked={this.state.hideCompleted}
                                            onClick={this.toggleHideCompleted}
                                        /> Cacher les films vu
                                    </label>
                                </div>

                                {this.renderMovies()}
                            </Row>
                        </div>
                    </section>
                </Content>
            </Layout>
        );
    }
}

export default withTracker(() => {
    return {
        movies: Movies.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Movies.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(AppContainer);