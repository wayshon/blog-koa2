// dao/ReprintSqlMapping.js
// CRUD SQL语句
const reprint = {
    insert:'INSERT INTO reprint(id, from_id, to_id) VALUES(0,?,?)',
    queryByFromId: 'select * from reprint where from_id=?',
    queryByToId: 'select * from reprint where to_id=?',
    remove: 'delete from reprint where id=?'
};

module.exports = reprint;