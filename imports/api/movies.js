import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Movies = new Mongo.Collection('movies');

if (Meteor.isServer) {
    Meteor.publish('movies', function moviessPublication() {
        return Movies.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'movies.insert'(title, filmMaker, filmGenre, filmDate, filmSynopsis) {
        check(title, String);
        check(filmMaker, String);
        check(filmGenre, String);
        check(filmDate, String);
        check(filmSynopsis, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Movies.insert({
            title: title,
            filmMaker: filmMaker,
            filmGenre: filmGenre,
            filmDate: filmDate,
            filmSynopsis: filmSynopsis,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'movies.remove'(movieId) {
        check((movieId), String);

        Movies.remove(movieId);
    },
    'movies.setChecked'(movieId, setChecked) {
        check(movieId, String);
        check(setChecked, Boolean);

        Movies.update(movieId, { $set: { checked: setChecked } });
    },
});
