const mysql = require('mysql2/promise');
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const { MYSQL_URL, MYSQL_ID, MYSQL_PWD } = process.env;

var pool = mysql.createPool({
    host: MYSQL_URL,
    user: MYSQL_ID,
    password: MYSQL_PWD,
    database: "blab"
});

const type =[
    [1, 0],
    [22,1],
    [28,0],
    [32,1],
    [33,0],
    [34,1],
    [36,0],
    [38,1],
    [39,0],
    [43,1],
    [67,0],
]

const createType = async (type, row, data) => {
    for(var i=0; i<type.length; i++){
        var d;
        //마지막 인덱스의 경우(67,68)
        if(i==type.length-1){
            for(var j=type[i][0]; j<data.length; j++){
                if(type[i][1]==0)
                    d=parseInt(data[j])
                else if(type[i][1]==1)
                    d=parseFloat(data[j]);
                
                if(isNaN(d))
                    row.push("NULL");
                else
                    row.push(d);
            }
        } 
        else{
            for(var j=type[i][0]; j<type[i+1][0]; j++){
                if(type[i][1]==0)
                    d=parseInt(data[j])
                else if(type[i][1]==1)
                    d=parseFloat(data[j]);
                
                if(isNaN(d))
                    row.push("NULL");
                else
                    row.push(d);
            }
        }
    }
    return row;
}
//csv 받는 모듈
//csv에서 데이터 추출
//추출된 데이터로 insert query
const createSchema = async (query) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            connection.query(query);
        } catch(err) {
            //console.log(err);
        }
    } catch(err) {
        //console.log(err);
    }
}
const insertData2 = async (fields, data) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            //console.log(fields.toString())
            query = 'INSERT INTO blab('+fields.toString()+')'+' VALUES ?'+' ON DUPLICATE KEY UPDATE SEX=VALUES(SEX)';
            connection.query(query, [data]);
        } catch(err) {
            //console.log(err);
        }
    } catch(err) {
        //console.log(err);
    }
}

const openCSV = function (stream) {
    //var stream = fs.createReadStream(file);
    //console.log(stream);
    var alldata = []
    var allInsert = []
    var csvStream = csv()
        .on("data", function(data){
            //console.log(data);
            alldata.push(data);
            //console.log(alldata);
        })
        .on("end", function () {
            console.log(alldata.length);
            
            var createQuery = 
            'create table if not exists blab( '+
            alldata[2][0]+' '+alldata[1][0]+' primary key,';

            for(var i = 1; i<alldata[0].length; i++){
                createQuery = createQuery + ' '+ alldata[2][i]+' '+ alldata[1][i] + ' ,';
            }
            createQuery = createQuery.substr(0, createQuery.length-1)+" )";
            createSchema(createQuery)
            .then( () => {
                for(var i = 3; i<alldata.length; i++){
                    var row = [];
                    row.push(alldata[i][0]);
                    createType(type, row, alldata[i]).then((parsed) => {
                        allInsert.push(parsed);
                    });
                    //console.log(setValues);
                }
                //console.log(allInsert);
            })
            .then( () => {
                insertData2(alldata[2], allInsert);
            })
            
            //console.log("done");
        })
    stream.pipe(csvStream);
}
//console.log(alldata);
module.exports = {
    openCSV: openCSV,
    type: type
};
