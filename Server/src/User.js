module.exports = function(modules) {
    const User = {};

    User.exists = function(id) {
        const filename = 'Database/' + id + '.json';
        try {
            modules.jsonFile.readFileSync(filename);
            return true;
        } catch (e) {
            return false;
        }
    };

    User.init = function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        const filename = 'Database/' + req.params.id + '.json';
        if (User.exists(req.params.id))
            res.send({"status": false});
        else {
            modules.jsonFile.writeFileSync(filename, {
                "cursos": []
            }, {spaces: 2});
            res.send({"status": User.exists(req.params.id)});
        }
    };

    User.getCourses = function(id) {
        try {
            const json = modules.jsonFile.readFileSync('Database/' + id + '.json');

            return json.cursos;
        } catch (e) {
            return null;
        }
    };


    return User;
};