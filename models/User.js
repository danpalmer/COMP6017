module.exports.define = function (db, models) {
    var User = db.define('user', {
        name:                 { type: 'text', size: 50 },
        email:                { type: 'text', size: 128 },
        dateSignedUp: { type: 'date', time: true }
    }, {
        methods: {
            render: function () {
                return {
                    name: this.name,
                    email: this.email,
                    dateSignedUp: this.dateSignedUp,
                    href: '/user/' + this.id,
                    id: this.id
                };
            }
        }
    });

    return User;
};

