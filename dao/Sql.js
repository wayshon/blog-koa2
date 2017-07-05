// CRUD SQL语句
// const user = {
//     Insert:'Insert INTO user(id, name, password, avatar, nickname) VALUES(0,?,?,?,?)',
//     Update:'Update user set user=?, password=?, nickname=? avatar=? where id=?',
//     delete: 'delete from user where id=?',
//     queryById: 'Select * from user where id=?',
//     queryByName: 'Select * from user where name=?',
//     queryAll: 'Select * from user'
// };

function Select(opt) {
    let {
        table, 
        target,         // 需要的数据[]
        params          // 参数{}
    } = opt;
    let targetStr = '';
    let paramsStr = '';

    target instanceof Array ? target.forEach((item, index) => {
        targetStr += item;
        index < target.length - 1 && (targetStr += ',');
    }) : (targetStr = '*');

    if (typeof params === 'object') {
        paramsStr = ' where ';
        Object.keys(params).forEach((item, index) => {
            let value = params[item];
            paramsStr += `${item} = '${value}'`;
            index < params.length - 1 && (paramsStr += ',');
        });
    }
    let sql = `Select ${targetStr} from ${table} ${paramsStr};`;
    console.log(sql);
    return sql;
}

function Insert(opt) {
    let {
        table, 
        params,         // 存入的数据
    } = opt;
    let keyStr = '';
    let valueStr = '';
    
    if (typeof params === 'object') {
        Object.keys(params).forEach((item, index) => {
            let value = params[item];
            keyStr += item; 
            valueStr += `'${value}'`;
            index < Object.keys(params).length - 1 && (keyStr += ', ', valueStr += ', ');
        });
    }

    let sql = `Insert INTO ${table} (${keyStr}) VALUES (${valueStr});`;
    console.log(sql);
    return sql;
}

function Update(opt) {
    let {
        table, 
        target,         // 更新的数据集合 {}
        params          // 参数{}
    } = opt;
    let targetStr = '';
    let paramsStr = '';
    
    if (typeof target === 'object') {
        Object.keys(target).forEach((item, index) => {
            let value = target[item];
            targetStr += `${item} = '${value}'`;
            index < Object.keys(target).length - 1 && (targetStr += ',');
        });
    }

    if (typeof params === 'object') {
        Object.keys(params).forEach((item, index) => {
            let value = params[item];
            paramsStr += `${item} = '${value}'`;
            index < Object.keys(params).length - 1 && (paramsStr += ',');
        });
    }

    let sql = `Update ${table} set ${targetStr} where ${paramsStr};`;
    console.log(sql);
    return sql;
}

function Delete(opt) {
    let {
        table, 
        params,         
    } = opt;
    let paramsStr = '';
    
    if (typeof params === 'object') {
        Object.keys(params).forEach((item, index) => {
            let value = params[item];
            paramsStr += `${item} = '${value}'`;
            index < Object.keys(params).length - 1 && (paramsStr += ',');
        });
    }

    let sql = `delete from ${table} where ${paramsStr};`;
    console.log(sql);
    return sql;
}


module.exports = {
    Select: Select,
    Insert: Insert,
    Update: Update,
    Delete: Delete
};