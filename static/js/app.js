const App = {
    template: `<template>
                <div id="app">
                    <div class="container">
                    <div class="d-flex justify-content-center mb-5"><h1>Poor Man's Twitter</h1></div>
                    <form @submit.prevent="submit">
                        <div class="row tweet-form">
                        <div class="col-md-2">
                            <div class="row form-grp">
                            <div class="col-md-4 form-label-wrap">
                                <label class="form-label">Name</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="tweet.name"/>
                            </div>
                            </div>
                            <div class="row" v-if="errors.name">
                            <p class="error-message">{{ errors.name }}</p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row form-grp">
                            <div class="col-md-2 form-label-wrap">
                                <label class="form-label">Tweet</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="tweet.content"/>
                            </div>
                            </div>
                            <div class="row" v-if="errors.content">
                            <p class="error-message">{{ errors.content }}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button>Submit</button>
                        </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col mt-5">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Created Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tweet of tweets" v-bind:key="tweet.id">
                                    <th scope="row">{{ tweet.id }}</th>
                                    <td>{{ tweet.name }}</td>
                                    <td>{{ tweet.content }}</td>
                                    <td>{{ formatDate(tweet.created_at) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </template>`,
    data() {
        return {
            tweet: {
                name: '',
                content: ''
            },
            errors: {
                name: '',
                content: '',
            },
            tweets: [],
            loading: false
        }
    },
    methods: {
        validate() {
            if (!this.tweet.name) {
                this.errors.name = "Please insert name";
            }
            if (!this.tweet.content) {
                this.errors.content = "Please insert content"
            }
            if (this.tweet.content && this.tweet.content.length >= 50) {
                this.errors.content = "Content must be less than 50"
            }
            return !this.errors.name && !this.errors.content;
        },
        getList() {
            axios.get('/api/tweets')
                .then((response) => response.data)
                .then(data => this.tweets = data)
        },
        submit()  {
            if (this.loading || !this.validate()) return;
            // this.loading = true;
            axios.post('/api/tweets', this.tweet)
                .then(() => {
                    this.tweet.name = '';
                    this.tweet.content = '';
                    this.getList();
                })
                .finally(() => {
                this.loading = false;
                })
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const dateTime = new Date(dateString);
            return (
                dateTime.getUTCFullYear() +
                '/' +
                (dateTime.getUTCMonth() + 1) +
                '/' +
                dateTime.getUTCDate()
            );
        }
    },
    computed: {
        name: function() {
            return this.tweet.name;
        },
        content: function() {
            return this.tweet.content;
        }
    },
    watch: {
        name: function(val) {
            if (val) this.errors.name = '';
        },
        content: function(val) {
            if (val) this.errors.content = '';
        }
    },
    mounted() {
        this.getList();
    }
}