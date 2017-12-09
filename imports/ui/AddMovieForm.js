import * as React from 'react';
import ReactDOM from 'react-dom';
import { Movies } from '../api/movies';
import { Meteor } from 'meteor/meteor';
import { Button, Icon, Form, DatePicker, Input, Modal, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

export class AddMovieForm extends React.Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const findId = (input) => {
          return document.getElementById(input).value.trim();
        };

        const title = findId('titleInput');
        const filmMaker = findId('filmMakerInput');
        const filmDate = document.getElementsByClassName('ant-calendar-picker-input')[0].value;
        const filmGenre = document.getElementsByClassName('ant-select-selection-selected-value')[0].textContent;
        const filmSynopsis = findId('filmSynopsisTextarea');

        Movies.insert({
            title: title,
            filmMaker: filmMaker,
            filmGenre: filmGenre,
            filmDate: filmDate,
            filmSynopsis: filmSynopsis,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        this.setState({ modalVisible: false });

        // Clear form
        document.getElementById('titleInput').value = '';
        document.getElementById('filmMakerInput').value = '';
        document.getElementsByClassName('ant-calendar-picker-input')[0].value = '';
        document.getElementById('filmSynopsisTextarea').value = '';
    };

    render() {
        return (
            <div>
                { this.props.currentUser &&
                <div>
                    <Button
                        type="primary"
                        style={{ marginBottom: 20 }}
                        onClick={() => this.setModalVisible(true)}
                    >
                        <Icon type="plus"/>Ajouter un film
                    </Button>

                    <Modal
                        title="Modal"
                        style={{ top: 20 }}
                        visible={this.state.modalVisible}
                        onOk={this.handleSubmit}
                        onCancel={() => this.setModalVisible(false)}
                        okText="Ajouter"
                        okType="submit"
                        cancelText="Annuler"
                    >
                        <Form className="new-movie">
                            <FormItem>
                                 <Input
                                 prefix={<Icon type="video-camera" style={{ color: 'rgba(0,0,0,.25)', width: '100%' }} />}
                                 placeholder="Title"
                                 id="titleInput"
                                 />
                            </FormItem>
                            <FormItem>
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', width: '100%' }} />}
                                    placeholder="Réalisateur"
                                    id="filmMakerInput"
                                />
                            </FormItem>
                            <FormItem>
                                <DatePicker className="filmDateInput" style={{ width: '100%' }} />
                            </FormItem>
                            <FormItem>
                                <Select placeholder="Sélectionner un genre" dropdownClassName="filmGenreInput">
                                    <Option value="policier">Policier</Option>
                                    <Option value="aventure">Aventure</Option>
                                    <Option value="comedie">Comédie</Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <TextArea id="filmSynopsisTextarea" placeholder="Synopsis..." />
                            </FormItem>
                        </Form>
                    </Modal>

                </div>
                }
            </div>

        )
    }
}

export default AddMovieForm;

