module.exports.define = function (db, models) {
    var User = db.define('user', {
        name:         { type: 'text', size: 50 },
        email:        { type: 'text', size: 128 },
        dateSignedUp: { type: 'date', time: true },
        dateModified: { type: 'date', time: true }
    }, {
        autoFetch: true,
        methods: {
            renderLong: function () {
                return {
                    name: this.name,
                    email: this.email,
                    dateSignedUp: this.dateSignedUp,
                    dateModified: this.dateModified,
                    id: this.id,
                    _links: {
                        self: { href: this.href() }
                    }
                };
            },
            renderShort: function () {
                return this.renderLong();
            },
            href: function () {
                return '/user/' + this.id;
            }
        }
    });

    return User;
};

